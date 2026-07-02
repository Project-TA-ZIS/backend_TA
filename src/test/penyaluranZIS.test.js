jest.mock("../repositories/ZIS_monitoring_repo/penyaluranZIS.repo", () => ({
  getAllPengeluaranZIS: jest.fn(),
  getPengeluaranZISById: jest.fn(),
  addPengeluaranZIS: jest.fn(),
  updatePengeluaranZIS: jest.fn(),
}));

jest.mock("../repositories/ZIS_monitoring_repo/mustahik.repo", () => ({
  getMustahikById: jest.fn(),
}));

jest.mock("../repositories/ZIS_monitoring_repo/totalZIS.repo", () => ({
  getTotalZISWhereKategori: jest.fn(),
  kurangTotalZIS: jest.fn(),
  tambahTotalZIS: jest.fn(),
}));

jest.mock("../controllers/auth/auth.controller", () => ({
  validateDate: jest.fn(),
}));

jest.mock("../../../Frontend-TA/src/utils/formattedDate", () => ({
  formatDateInput: jest.fn((tanggal) => tanggal),
}));

const controller = require("../controllers/ZIS_monitoring_controllers/penyaluranZIS.controller");
const penyaluranRepo = require("../repositories/ZIS_monitoring_repo/penyaluranZIS.repo");
const mustahikRepo = require("../repositories/ZIS_monitoring_repo/mustahik.repo");
const totalZISRepo = require("../repositories/ZIS_monitoring_repo/totalZIS.repo");
const authController = require("../controllers/auth/auth.controller");

describe("Penyaluran ZIS Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();

    req = {
      body: {},
      params: {},
      roles: "",
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllPengeluaranZIS", () => {
    test("returns 404 when data is empty", async () => {
      penyaluranRepo.getAllPengeluaranZIS.mockResolvedValue([]);

      await controller.getAllPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns pengeluaran ZIS data", async () => {
      penyaluranRepo.getAllPengeluaranZIS.mockResolvedValue([
        {
          id: 1,
          mustahik_id: 2,
          kategori: "zakat mal",
          jumlah: 100000,
          tanggal_penyaluran: "2026-01-01",
          nama_mustahik: "Rafif",
        },
      ]);

      await controller.getAllPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 1,
          kategori: "zakat mal",
          jumlah: 100000,
        }),
      ]);
    });
  });

  describe("getPengeluaranZISById", () => {
    test("returns 404 when pengeluaran ZIS is not found", async () => {
      req.params = { id: 1 };
      penyaluranRepo.getPengeluaranZISById.mockResolvedValue(null);

      await controller.getPengeluaranZISById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns pengeluaran ZIS by id", async () => {
      req.params = { id: 1 };
      penyaluranRepo.getPengeluaranZISById.mockResolvedValue({
        id: 1,
        mustahik_id: 2,
        kategori: "infaq",
        jumlah: 50000,
        tanggal_penyaluran: "2026-01-01",
      });

      await controller.getPengeluaranZISById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("addPengeluaranZIS", () => {
    test("rejects non amil zakat role", async () => {
      req.roles = "kader dasawisma";

      await controller.addPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("returns 404 when mustahik is not found", async () => {
      req.roles = "amil zakat";
      req.body = { mustahik_id: 99 };
      mustahikRepo.getMustahikById.mockResolvedValue(null);

      await controller.addPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("rejects future date", async () => {
      req.roles = "amil zakat";
      req.body = {
        mustahik_id: 1,
        kategori: "zakat mal",
        jumlah: 100000,
        deskripsi: "Bantuan",
        tanggal_penyaluran: "2099-01-01",
      };

      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      authController.validateDate.mockReturnValue(false);

      await controller.addPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(penyaluranRepo.addPengeluaranZIS).not.toHaveBeenCalled();
    });

    test("returns 404 when kategori total ZIS does not exist", async () => {
      req.roles = "amil zakat";
      req.body = {
        mustahik_id: 1,
        kategori: "zakat mal",
        jumlah: 100000,
        tanggal_penyaluran: "2026-01-01",
      };

      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      authController.validateDate.mockReturnValue(true);
      totalZISRepo.getTotalZISWhereKategori.mockResolvedValue(null);

      await controller.addPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("rejects when ZIS balance is insufficient", async () => {
      req.roles = "amil zakat";
      req.body = {
        mustahik_id: 1,
        kategori: "zakat mal",
        jumlah: 150000,
        tanggal_penyaluran: "2026-01-01",
      };

      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      authController.validateDate.mockReturnValue(true);
      totalZISRepo.getTotalZISWhereKategori.mockResolvedValue({
        kategori: "zakat mal",
        jumlah_keseluruhan: 100000,
      });

      await controller.addPengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(penyaluranRepo.addPengeluaranZIS).not.toHaveBeenCalled();
    });

    test("adds pengeluaran and decreases total ZIS", async () => {
      req.roles = "amil zakat";
      req.body = {
        mustahik_id: 1,
        kategori: "zakat mal",
        jumlah: 100000,
        deskripsi: "Bantuan",
        tanggal_penyaluran: "2026-01-01",
      };

      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      authController.validateDate.mockReturnValue(true);
      totalZISRepo.getTotalZISWhereKategori.mockResolvedValue({
        kategori: "zakat mal",
        jumlah_keseluruhan: 200000,
      });
      penyaluranRepo.addPengeluaranZIS.mockResolvedValue(10);

      await controller.addPengeluaranZIS(req, res);

      expect(penyaluranRepo.addPengeluaranZIS).toHaveBeenCalledWith(
        expect.objectContaining({
          mustahik_id: 1,
          kategori: "zakat mal",
          jumlah: 100000,
          nama_mustahik: "Rafif",
        }),
      );
      expect(totalZISRepo.kurangTotalZIS).toHaveBeenCalledWith("zakat mal", 100000);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("updatePengeluaranZIS", () => {
    test("returns 404 when mustahik is not found", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        mustahik_id: 99,
        kategori: "zakat mal",
        jumlah: 100000,
        tanggal_penyaluran: "2026-01-01",
      };

      authController.validateDate.mockReturnValue(true);
      mustahikRepo.getMustahikById.mockResolvedValue(null);

      await controller.updatePengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns 404 when existing pengeluaran is not found", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        mustahik_id: 1,
        kategori: "zakat mal",
        jumlah: 100000,
        tanggal_penyaluran: "2026-01-01",
      };

      authController.validateDate.mockReturnValue(true);
      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      penyaluranRepo.getPengeluaranZISById.mockResolvedValue(null);

      await controller.updatePengeluaranZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("updates same category using amount difference", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        mustahik_id: 1,
        kategori: "zakat mal",
        jumlah: 150000,
        deskripsi: "Update bantuan",
        tanggal_penyaluran: "2026-01-01",
        nama_mustahik: "Rafif",
      };

      authController.validateDate.mockReturnValue(true);
      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      penyaluranRepo.getPengeluaranZISById.mockResolvedValue({
        id: 1,
        kategori: "zakat mal",
        jumlah: 100000,
      });

      await controller.updatePengeluaranZIS(req, res);

      expect(totalZISRepo.kurangTotalZIS).toHaveBeenCalledWith("zakat mal", 50000);
      expect(penyaluranRepo.updatePengeluaranZIS).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ kategori: "zakat mal", jumlah: 150000 }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("moves total when category changes", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = {
        mustahik_id: 1,
        kategori: "infaq",
        jumlah: 50000,
        deskripsi: "Update kategori",
        tanggal_penyaluran: "2026-01-01",
        nama_mustahik: "Rafif",
      };

      authController.validateDate.mockReturnValue(true);
      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, nama_lengkap: "Rafif" });
      penyaluranRepo.getPengeluaranZISById.mockResolvedValue({
        id: 1,
        kategori: "zakat mal",
        jumlah: 100000,
      });

      await controller.updatePengeluaranZIS(req, res);

      expect(totalZISRepo.tambahTotalZIS).toHaveBeenCalledWith("zakat mal", 100000);
      expect(totalZISRepo.kurangTotalZIS).toHaveBeenCalledWith("infaq", 50000);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
