jest.mock("../repositories/ZIS_monitoring_repo/muzakki.repo", () => ({
  getMuzakkiById: jest.fn(),
  getMuzakkiByNik: jest.fn(),
}));

jest.mock("../repositories/ZIS_monitoring_repo/pemasukanZIS.repo", () => ({
  getAllPemasukanZIS: jest.fn(),
  getPemasukanZISById: jest.fn(),
  addPemasukanZIS: jest.fn(),
  updatePemasukanZIS: jest.fn(),
  deletePemasukanZIS: jest.fn(),
  getPemasukanZISByMuzakkiId: jest.fn(),
}));

jest.mock("../repositories/ZIS_monitoring_repo/totalZIS.repo", () => ({
  tambahTotalZIS: jest.fn(),
}));

jest.mock("../controllers/auth/auth.controller", () => ({
  validateDate: jest.fn(),
}));

jest.mock("../utils/formatDateInput", () => ({
  formatDateInput: jest.fn((tanggal) => tanggal),
}));

const controller = require("../controllers/ZIS_monitoring_controllers/pemasukanZIS.controller");
const muzakkiRepo = require("../repositories/ZIS_monitoring_repo/muzakki.repo");
const pemasukanRepo = require("../repositories/ZIS_monitoring_repo/pemasukanZIS.repo");
const totalZISRepo = require("../repositories/ZIS_monitoring_repo/totalZIS.repo");
const authController = require("../controllers/auth/auth.controller");

describe("Pemasukan ZIS Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();

    req = {
      body: {},
      params: {},
      query: {},
      roles: "",
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllPemasukanZIS", () => {
    test("returns 404 when data is empty", async () => {
      pemasukanRepo.getAllPemasukanZIS.mockResolvedValue([]);

      await controller.getAllPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns pemasukan ZIS data", async () => {
      pemasukanRepo.getAllPemasukanZIS.mockResolvedValue([
        {
          id: 1,
          muzakki_id: 2,
          kategori: "zakat maal",
          jumlah: 100000,
          deskripsi: "Zakat bulan ini",
          tanggal_penghimpunan: "2026-01-01",
          nama_muzakki: "Rafif",
        },
      ]);

      await controller.getAllPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [
          expect.objectContaining({
            id: 1,
            kategori: "zakat maal",
            jumlah: 100000,
          }),
        ],
      });
    });
  });

  describe("getPemasukanZISById", () => {
    test("returns 404 when pemasukan ZIS is not found", async () => {
      req.params = { id: 1 };
      pemasukanRepo.getPemasukanZISById.mockResolvedValue(null);

      await controller.getPemasukanZISById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns pemasukan ZIS by id", async () => {
      req.params = { id: 1 };
      pemasukanRepo.getPemasukanZISById.mockResolvedValue({
        id: 1,
        muzakki_id: 2,
        kategori: "infaq",
        jumlah: 50000,
        tanggal_penghimpunan: "2026-01-01",
      });

      await controller.getPemasukanZISById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("addPemasukanZIS", () => {
    test("rejects non amil zakat role", async () => {
      req.roles = "kader dasawisma";

      await controller.addPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("returns 404 when muzakki is not found", async () => {
      req.roles = "amil zakat";
      req.body = { muzakki_id: 99 };
      muzakkiRepo.getMuzakkiById.mockResolvedValue(null);

      await controller.addPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("rejects future date", async () => {
      req.roles = "amil zakat";
      req.body = {
        muzakki_id: 1,
        kategori: "zakat maal",
        jumlah: 100000,
        deskripsi: "Zakat",
        tanggal_penghimpunan: "2099-01-01",
      };

      muzakkiRepo.getMuzakkiById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      authController.validateDate.mockReturnValue(false);

      await controller.addPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(pemasukanRepo.addPemasukanZIS).not.toHaveBeenCalled();
    });

    test("adds pemasukan and increases total ZIS", async () => {
      req.roles = "amil zakat";
      req.body = {
        muzakki_id: 1,
        kategori: "zakat maal",
        jumlah: 100000,
        deskripsi: "Zakat",
        tanggal_penghimpunan: "2026-01-01",
      };

      muzakkiRepo.getMuzakkiById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      authController.validateDate.mockReturnValue(true);
      pemasukanRepo.addPemasukanZIS.mockResolvedValue(10);

      await controller.addPemasukanZIS(req, res);

      expect(pemasukanRepo.addPemasukanZIS).toHaveBeenCalledWith(
        expect.objectContaining({
          muzakki_id: 1,
          kategori: "zakat maal",
          jumlah: 100000,
          nama_muzakki: "Rafif",
        }),
      );
      expect(totalZISRepo.tambahTotalZIS).toHaveBeenCalledWith("zakat maal", 100000);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("updatePemasukanZIS", () => {
    test("returns 404 when existing data is not found", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        muzakki_id: 1,
        kategori: "zakat maal",
        jumlah: 100000,
        tanggal_penghimpunan: "2026-01-01",
      };

      authController.validateDate.mockReturnValue(true);
      pemasukanRepo.getPemasukanZISById.mockResolvedValue(null);

      await controller.updatePemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("updates same category using amount difference", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        muzakki_id: 1,
        kategori: "zakat maal",
        jumlah: 150000,
        deskripsi: "Update zakat",
        tanggal_penghimpunan: "2026-01-01",
        nama_muzakki: "Rafif",
      };

      authController.validateDate.mockReturnValue(true);
      pemasukanRepo.getPemasukanZISById.mockResolvedValue({
        id: 1,
        kategori: "zakat maal",
        jumlah: 100000,
      });

      await controller.updatePemasukanZIS(req, res);

      expect(authController.validateDate).not.toHaveBeenCalled();
      expect(totalZISRepo.tambahTotalZIS).toHaveBeenCalledWith("zakat maal", 50000);
      expect(pemasukanRepo.updatePemasukanZIS).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ kategori: "zakat maal", jumlah: 150000 }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("moves total when category changes", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        muzakki_id: 1,
        kategori: "infaq",
        jumlah: 50000,
        deskripsi: "Update kategori",
        tanggal_penghimpunan: "2026-01-01",
        nama_muzakki: "Rafif",
      };

      authController.validateDate.mockReturnValue(true);
      pemasukanRepo.getPemasukanZISById.mockResolvedValue({
        id: 1,
        kategori: "zakat maal",
        jumlah: 100000,
      });

      await controller.updatePemasukanZIS(req, res);

      expect(totalZISRepo.tambahTotalZIS).toHaveBeenNthCalledWith(1, "zakat maal", -100000);
      expect(totalZISRepo.tambahTotalZIS).toHaveBeenNthCalledWith(2, "infaq", 50000);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deletePemasukanZIS", () => {
    test("deletes pemasukan and decreases total ZIS", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      pemasukanRepo.getPemasukanZISById.mockResolvedValue({
        id: 1,
        kategori: "zakat maal",
        jumlah: 100000,
      });

      await controller.deletePemasukanZIS(req, res);

      expect(pemasukanRepo.deletePemasukanZIS).toHaveBeenCalledWith(1);
      expect(totalZISRepo.tambahTotalZIS).toHaveBeenCalledWith("zakat maal", -100000);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getRiwayatPemasukanZISByNik", () => {
    test("requires nik and last phone digits", async () => {
      await controller.getRiwayatPemasukanZISByNik(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("returns riwayat pemasukan for valid muzakki identity", async () => {
      req.body = { nik: "3276", last_phone_digits: "1234" };
      muzakkiRepo.getMuzakkiByNik.mockResolvedValue({
        id: 1,
        nomor_telpon: "0812341234",
      });
      pemasukanRepo.getPemasukanZISByMuzakkiId.mockResolvedValue([
        { id: 1, kategori: "infaq", jumlah: 50000 },
      ]);

      await controller.getRiwayatPemasukanZISByNik(req, res);

      expect(pemasukanRepo.getPemasukanZISByMuzakkiId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
