jest.mock(
  "../repositories/dasawisma_monitoring_repo/penyaluranDasawisma.repo",
  () => ({
    getAllPengeluaranDasawisma: jest.fn(),
    getPengeluaranDasawismaById: jest.fn(),
    addPengeluaranDasawisma: jest.fn(),
    updatePengeluaranDasawisma: jest.fn(),
  }),
);

jest.mock(
  "../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo",
  () => ({
    kurangiTotalDasawisma: jest.fn(),
    tambahTotalDasawisma: jest.fn(),
  }),
);

jest.mock("../controllers/auth/auth.controller", () => ({
  validateDate: jest.fn(),
}));

const controller = require("../controllers/dasawisma_monitoring_controllers/penyaluranDasawisma.controller");
const pengeluaranRepo = require("../repositories/dasawisma_monitoring_repo/penyaluranDasawisma.repo");
const authController = require("../controllers/auth/auth.controller");
const totalKasRepo = require("../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");

describe("Penyaluran Dasawisma Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      body: {},
      params: {},
      roles: "",
      id: null,
      rw: 1,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllPengeluaranDasawisma", () => {
    test("getAllPengeluaranDasawisma forbidden", async () => {
      req.roles = "amil zakat";

      await controller.getAllPengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("getAllPengeluaranDasawisma empty", async () => {
      req.roles = "kader dasawisma";

      pengeluaranRepo.getAllPengeluaranDasawisma.mockResolvedValue([]);

      await controller.getAllPengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("getAllPengeluaranDasawisma success", async () => {
      req.roles = "kader dasawisma";

      pengeluaranRepo.getAllPengeluaranDasawisma.mockResolvedValue([
        {
          id: 1,
          jumlah: 100000,
          deskripsi: "Operasional",
        },
      ]);

      await controller.getAllPengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getPengeluaranDasawismaById", () => {
    test("getPengeluaranDasawismaById forbidden", async () => {
      req.roles = "amil zakat";

      await controller.getPengeluaranDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("getPengeluaranDasawismaById not found", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      pengeluaranRepo.getPengeluaranDasawismaById.mockResolvedValue(null);

      await controller.getPengeluaranDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("getPengeluaranDasawismaById success", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      pengeluaranRepo.getPengeluaranDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      await controller.getPengeluaranDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("addPengeluaranDasawisma", () => {
    test("addPengeluaranDasawisma forbidden", async () => {
      req.roles = "kader dasawisma";

      await controller.addPengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("addPengeluaranDasawisma validation failed", async () => {
      req.roles = "penanggung jawab dasawisma";

      req.body = {
        jumlah: 100000,
      };

      await controller.addPengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
    test("addPengeluaranDasawisma success", async () => {
      req.roles = "penanggung jawab dasawisma";

      req.body = {
        jumlah: 100000,
        deskripsi: "Operasional",
        tanggal_penyaluran: "2026-01-01",
        nama_anggota: "Rafif",
      };

      authController.validateDate.mockReturnValue(true);

      pengeluaranRepo.addPengeluaranDasawisma.mockResolvedValue(1);

      await controller.addPengeluaranDasawisma(req, res);

      expect(totalKasRepo.kurangiTotalDasawisma).toHaveBeenCalledWith(100000, 1);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("SALDO_TIDAK_CUKUP", () => {
    test("addPengeluaranDasawisma saldo tidak cukup", async () => {
      req.roles = "penanggung jawab dasawisma";

      req.body = {
        jumlah: 100000,
        deskripsi: "Operasional",
        tanggal_penyaluran: "2026-01-01",
      };

      authController.validateDate.mockReturnValue(true);

      const error = new Error("Saldo tidak cukup");
      error.code = "SALDO_TIDAK_CUKUP";

      totalKasRepo.kurangiTotalDasawisma.mockRejectedValue(error);

      await controller.addPengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("updatePengeluaranDasawisma", () => {
    test("updatePengeluaranDasawisma forbidden", async () => {
      req.roles = "kader dasawisma";

      await controller.updatePengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });
    test("updatePengeluaranDasawisma not found", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };

      pengeluaranRepo.getPengeluaranDasawismaById.mockResolvedValue(null);

      await controller.updatePengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
    test("updatePengeluaranDasawisma invalid date", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };

      pengeluaranRepo.getPengeluaranDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      authController.validateDate.mockReturnValue(false);

      await controller.updatePengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
    test("updatePengeluaranDasawisma success", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };

      req.body = {
        jumlah: 150000,
        deskripsi: "Update",
        tanggal_penyaluran: "2026-01-01",
      };

      pengeluaranRepo.getPengeluaranDasawismaById.mockResolvedValue({
        id: 1,
        jumlah: 100000,
      });

      authController.validateDate.mockReturnValue(true);

      pengeluaranRepo.updatePengeluaranDasawisma.mockResolvedValue({
        affectedRows: 1,
      });

      await controller.updatePengeluaranDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
