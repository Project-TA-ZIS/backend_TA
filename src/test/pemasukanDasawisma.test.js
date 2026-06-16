jest.mock(
  "../repositories/dasawisma_monitoring_repo/pemasukanDasawisma.repo",
  () => ({
    getAllPemasukanDasawisma: jest.fn(),
    getPemasukanDasawismaById: jest.fn(),
    createPemasukanDasawisma: jest.fn(),
    updatePemasukanDasawisma: jest.fn(),
  }),
);

jest.mock(
  "../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo",
  () => ({
    tambahTotalDasawisma: jest.fn(),
    kurangiTotalDasawisma: jest.fn(),
  }),
);

jest.mock(
  "../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo",
  () => ({
    getAnggotaDasawismaById: jest.fn(),
  }),
);

jest.mock("../controllers/auth/auth.controller", () => ({
  validateDate: jest.fn(),
}));

const controller = require("../controllers/dasawisma_monitoring_controllers/pemasukanDasawisma.controller");
const pemasukanRepo = require("../repositories/dasawisma_monitoring_repo/pemasukanDasawisma.repo");
const totalKasRepo = require("../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");
const anggotaRepo = require("../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const authController = require("../controllers/auth/auth.controller");

describe("Pemasukan Dasawisma Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();

    req = {
      body: {},
      params: {},
      roles: "",
      rw: 1,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllPemasukanDasawisma", () => {
    test("getAllPemasukanDasawisma forbidden", async () => {
      req.roles = "amil zakat";
      await controller.getAllPemasukanDasawisma(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });
  });

  test("getAllPemasukanDasawisma empty", async () => {
    req.roles = "kader dasawisma";

    pemasukanRepo.getAllPemasukanDasawisma.mockResolvedValue([]);

    await controller.getAllPemasukanDasawisma(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("getAllPemasukanDasawisma success", async () => {
    req.roles = "kader dasawisma";

    pemasukanRepo.getAllPemasukanDasawisma.mockResolvedValue([
      {
        id: 1,
        jumlah: 100000,
        sumber: "IURAN",
      },
    ]);

    await controller.getAllPemasukanDasawisma(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  describe("getPemasukanDasawismaById", () => {
    test("getPemasukanDasawismaById not found", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue(null);

      await controller.getPemasukanDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("getPemasukanDasawismaById success", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      await controller.getPemasukanDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("addPemasukanDasawisma", () => {
    test("addPemasukanDasawisma anggota not found", async () => {
      req.roles = "kader dasawisma";

      req.body = {
        anggota_dasawisma_id: 1,
      };

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue(null);

      await controller.addPemasukanDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("addPemasukanDasawisma validation failed", async () => {
      req.roles = "kader dasawisma";

      req.body = {
        sumber: "",
      };

      await controller.addPemasukanDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("addPemasukanDasawisma invalid date", async () => {
      req.roles = "kader dasawisma";

      req.body = {
        sumber: "IURAN",
        jumlah: 100000,
        deskripsi: "Kas",
        tanggal_penghimpunan: "2099-01-01",
      };

      authController.validateDate.mockReturnValue(false);

      await controller.addPemasukanDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("addPemasukanDasawisma success", async () => {
      req.roles = "kader dasawisma";

      req.body = {
        sumber: "IURAN",
        jumlah: 100000,
        deskripsi: "Kas",
        tanggal_penghimpunan: "2026-01-01",
      };

      authController.validateDate.mockReturnValue(true);

      pemasukanRepo.createPemasukanDasawisma.mockResolvedValue(1);

      await controller.addPemasukanDasawisma(req, res);

      expect(totalKasRepo.tambahTotalDasawisma).toHaveBeenCalledWith(100000, 1);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("updatePemasukanDasawisma", () => {
    test("updatePemasukanDasawisma not found", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue(null);

      await controller.updatePemasukanDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("updatePemasukanDasawisma anggota id required", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      req.body = {
        sumber: "IURAN",
      };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      await controller.updatePemasukanDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("updatePemasukanDasawisma invalid date", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      req.body = {
        sumber: "IURAN",
        jumlah: 100000,
        deskripsi: "Kas",
        anggota_dasawisma_id: 1,
        tanggal_penghimpunan: "2099-01-01",
      };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue({
        id: 1,
        nama_lengkap: "Rafif",
      });

      authController.validateDate.mockReturnValue(false);

      await controller.updatePemasukanDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("updatePemasukanDasawisma success tambah saldo", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      req.body = {
        jumlah: 150000,
        sumber: "IURAN",
        deskripsi: "Kas",
        tanggal_penghimpunan: "2026-01-01",
        anggota_dasawisma_id: 1,
      };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue({
        id: 1,
        nama_lengkap: "Rafif",
      });

      authController.validateDate.mockReturnValue(true);

      await controller.updatePemasukanDasawisma(req, res);

      expect(totalKasRepo.tambahTotalDasawisma).toHaveBeenCalledWith(50000, 1);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("updatePemasukanDasawisma success kurangi saldo", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      req.body = {
        jumlah: 50000,
        sumber: "IURAN",
        deskripsi: "Kas",
        tanggal_penghimpunan: "2026-01-01",
        anggota_dasawisma_id: 1,
      };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue({
        id: 1,
        nama_lengkap: "Rafif",
      });

      authController.validateDate.mockReturnValue(true);

      await controller.updatePemasukanDasawisma(req, res);

      expect(totalKasRepo.kurangiTotalDasawisma).toHaveBeenCalledWith(50000, 1);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("updatePemasukanDasawisma sumber lainnya clears anggota", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      req.body = {
        jumlah: 100000,
        sumber: "LAINNYA",
        deskripsi: "Donasi umum",
        tanggal_penghimpunan: "2026-01-01",
        anggota_dasawisma_id: 1,
      };

      pemasukanRepo.getPemasukanDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
        anggota_dasawisma_id: 1,
        nama_anggota: "Rafif",
      });

      authController.validateDate.mockReturnValue(true);

      await controller.updatePemasukanDasawisma(req, res);

      expect(anggotaRepo.getAnggotaDasawismaById).not.toHaveBeenCalled();
      expect(pemasukanRepo.updatePemasukanDasawisma).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          sumber: "LAINNYA",
          anggota_dasawisma_id: 1,
          nama_anggota: "Rafif",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
