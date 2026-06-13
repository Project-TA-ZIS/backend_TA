jest.mock(
  "../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo",
  () => ({
    getAllAnggotaDasawisma: jest.fn(),
    getAnggotaDasawismaById: jest.fn(),
    getAnggotaDasawismaByEmail: jest.fn(),
    getAnggotaDasawismaByNik: jest.fn(),
    getAnggotaDasawismaByPhone: jest.fn(),
    createAnggotaDasawisma: jest.fn(),
    deleteAnggotaDasawisma: jest.fn(),
    updateAnggotaDasawisma: jest.fn(),
    updateAnggotaByPJ: jest.fn(),
    updatePassword: jest.fn(),
  }),
);

jest.mock("../controllers/auth/auth.controller", () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn(),
}));

const controller = require("../controllers/dasawisma_monitoring_controllers/anggotaDasawisma.controller");
const anggotaRepo = require("../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const authController = require("../controllers/auth/auth.controller");

describe("Anggota Dasawisma Controller", () => {
  let req;
  let res;
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      roles: "",
      id: null,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("GET", () => {
    test("getAllAnggotaDasawisma success", async () => {
      anggotaRepo.getAllAnggotaDasawisma.mockResolvedValue([
        {
          id: 1,
          nama_lengkap: "Rafif",
          email: "rafif@test.com",
        },
      ]);

      await controller.getAllAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    test("getAllAnggotaDasawisma empty", async () => {
      anggotaRepo.getAllAnggotaDasawisma.mockResolvedValue([]);

      await controller.getAllAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("getAnggotaById success", async () => {
      req.params = { id: 1 };

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue({
        id: 1,
        nama_lengkap: "Rafif",
      });

      await controller.getAnggotaDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("getAnggotaById not found", async () => {
      req.params = { id: 1 };

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue(null);

      await controller.getAnggotaDasawismaById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("CREATE", () => {
    test("createAnggotaDasawisma forbidden", async () => {
      req.roles = "kader dasawisma";

      await controller.createAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("createAnggotaDasawisma field kosong", async () => {
      req.roles = "penanggung jawab dasawisma";

      req.body = {};

      await controller.createAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("createAnggotaDasawisma password pendek", async () => {
      req.roles = "penanggung jawab dasawisma";

      req.body = {
        nama_lengkap: "Rafif",
        email: "rafif@test.com",
        password: "123",
      };

      await controller.createAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("createAnggotaDasawisma success", async () => {
      req.roles = "penanggung jawab dasawisma";

      req.body = {
        nama_lengkap: "Rafif",
        email: "rafif@test.com",
        password: "123456",
        roles: "kader dasawisma",
      };

      anggotaRepo.getAnggotaDasawismaByEmail.mockResolvedValue(null);
      anggotaRepo.getAnggotaDasawismaByNik.mockResolvedValue(null);
      anggotaRepo.getAnggotaDasawismaByPhone.mockResolvedValue(null);

      anggotaRepo.createAnggotaDasawisma.mockResolvedValue(1);

      await controller.createAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("DELETE", () => {
    test("deleteAnggotaDasawisma forbidden", async () => {
      req.roles = "kader dasawisma";

      await controller.deleteAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("deleteAnggotaDasawisma not found", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };

      anggotaRepo.deleteAnggotaDasawisma.mockResolvedValue(false);

      await controller.deleteAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("deleteAnggotaDasawisma success", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };

      anggotaRepo.deleteAnggotaDasawisma.mockResolvedValue(true);

      await controller.deleteAnggotaDasawisma(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("UPDATE", () => {
    test("updatePassword old password invalid", async () => {
      req.id = 1;

      req.body = {
        oldPassword: "123",
        newPassword: "123456",
      };

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue({
        id: 1,
        password: "hash",
      });

      authController.comparePassword.mockResolvedValue(false);

      await controller.updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("updatePassword success", async () => {
      req.id = 1;

      req.body = {
        oldPassword: "123",
        newPassword: "123456",
      };

      anggotaRepo.getAnggotaDasawismaById.mockResolvedValue({
        id: 1,
        password: "hash",
      });

      authController.comparePassword.mockResolvedValue(true);

      authController.hashPassword.mockResolvedValue("newHash");

      anggotaRepo.updatePassword.mockResolvedValue(true);

      await controller.updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
