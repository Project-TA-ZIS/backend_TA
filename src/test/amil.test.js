jest.mock("../repositories/ZIS_monitoring_repo/amil.repo", () => ({
  getAllAmil: jest.fn(),
  getAmilById: jest.fn(),
  getAmilByEmail: jest.fn(),
  getAmilbyNomorTelpon: jest.fn(),
  createAmil: jest.fn(),
  deleteAmil: jest.fn(),
  updateAmil: jest.fn(),
  updateAmilPassword: jest.fn(),
}));

jest.mock("../controllers/auth/auth.controller", () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn(),
}));

const controller = require("../controllers/ZIS_monitoring_controllers/amil.controller");
const amilRepo = require("../repositories/ZIS_monitoring_repo/amil.repo");
const authController = require("../controllers/auth/auth.controller");

const validBody = {
  nama_lengkap: "Rafif",
  email: "rafif@test.com",
  password: "secret123",
  nomor_telpon: "081234567890",
  alamat: "Bandung",
};

describe("Amil Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();

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
  });

  describe("getAllAmil", () => {
    test("returns 404 when data is empty", async () => {
      amilRepo.getAllAmil.mockResolvedValue([]);

      await controller.getAllAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns amil list", async () => {
      amilRepo.getAllAmil.mockResolvedValue([{ id: 1, ...validBody }]);

      await controller.getAllAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [expect.objectContaining({ id: 1, email: validBody.email })],
      });
    });
  });

  describe("getAmilById", () => {
    test("returns 404 when amil is not found", async () => {
      req.params = { id: 99 };
      amilRepo.getAmilById.mockResolvedValue(null);

      await controller.getAmilById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns amil by id", async () => {
      req.params = { id: 1 };
      amilRepo.getAmilById.mockResolvedValue({ id: 1, ...validBody });

      await controller.getAmilById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({ id: 1, email: validBody.email }),
      });
    });
  });

  describe("createAmil", () => {
    test("rejects non penanggung jawab dasawisma role", async () => {
      req.roles = "amil zakat";

      await controller.createAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(amilRepo.createAmil).not.toHaveBeenCalled();
    });

    test("validates required fields", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.body = { nama_lengkap: "Rafif" };

      await controller.createAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Semua field wajib diisi" });
    });

    test("validates password length", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.body = { ...validBody, password: "123" };

      await controller.createAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Password minimal 6 karakter" });
    });

    test("rejects duplicate email", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.body = validBody;
      amilRepo.getAmilByEmail.mockResolvedValue({ id: 2 });

      await controller.createAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email sudah terdaftar" });
    });

    test("rejects duplicate phone number", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.body = validBody;
      amilRepo.getAmilByEmail.mockResolvedValue(null);
      amilRepo.getAmilbyNomorTelpon.mockResolvedValue({ id: 2 });

      await controller.createAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Nomor telpon sudah terdaftar" });
    });

    test("creates amil", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.body = validBody;
      amilRepo.getAmilByEmail.mockResolvedValue(null);
      amilRepo.getAmilbyNomorTelpon.mockResolvedValue(null);
      amilRepo.createAmil.mockResolvedValue(1);

      await controller.createAmil(req, res);

      expect(amilRepo.createAmil).toHaveBeenCalledWith(
        expect.objectContaining({
          nama_lengkap: validBody.nama_lengkap,
          email: validBody.email,
          roles: "amil zakat",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deleteAmil", () => {
    test("rejects non penanggung jawab dasawisma role", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };

      await controller.deleteAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(amilRepo.deleteAmil).not.toHaveBeenCalled();
    });

    test("returns 404 when delete target is not found", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 99 };
      amilRepo.deleteAmil.mockResolvedValue(false);

      await controller.deleteAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("deletes amil", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };
      amilRepo.deleteAmil.mockResolvedValue(true);

      await controller.deleteAmil(req, res);

      expect(amilRepo.deleteAmil).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("updateAmil", () => {
    test("returns 404 when amil is not found", async () => {
      req.params = { id: 99 };
      req.body = validBody;
      amilRepo.getAmilById.mockResolvedValue(null);

      await controller.updateAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("rejects duplicate email on update", async () => {
      req.params = { id: 1 };
      req.body = validBody;
      amilRepo.getAmilById.mockResolvedValue({ id: 1, ...validBody });
      amilRepo.getAmilByEmail.mockResolvedValue({ id: 2 });

      await controller.updateAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Email sudah terdaftar" });
    });

    test("returns 400 when repository fails to update", async () => {
      req.params = { id: 1 };
      req.body = validBody;
      amilRepo.getAmilById.mockResolvedValue({ id: 1, ...validBody });
      amilRepo.getAmilByEmail.mockResolvedValue({ id: 1 });
      amilRepo.getAmilbyNomorTelpon.mockResolvedValue({ id: 1 });
      amilRepo.updateAmil.mockResolvedValue(false);

      await controller.updateAmil(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("updates amil", async () => {
      req.params = { id: 1 };
      req.body = validBody;
      amilRepo.getAmilById.mockResolvedValue({ id: 1, ...validBody });
      amilRepo.getAmilByEmail.mockResolvedValue({ id: 1 });
      amilRepo.getAmilbyNomorTelpon.mockResolvedValue({ id: 1 });
      amilRepo.updateAmil.mockResolvedValue(true);

      await controller.updateAmil(req, res);

      expect(amilRepo.updateAmil).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          nama_lengkap: validBody.nama_lengkap,
          email: validBody.email,
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("updateAmilPassword", () => {
    test("returns 404 when amil is not found", async () => {
      req.id = 1;
      req.body = { oldPassword: "oldpass", newPassword: "newpass" };
      amilRepo.getAmilById.mockResolvedValue(null);

      await controller.updateAmilPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("rejects incorrect old password", async () => {
      req.id = 1;
      req.body = { oldPassword: "wrong", newPassword: "newpass" };
      amilRepo.getAmilById.mockResolvedValue({ id: 1, password: "hashed-old" });
      authController.comparePassword.mockResolvedValue(false);

      await controller.updateAmilPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Old password is incorrect" });
    });

    test("returns 400 when password update fails", async () => {
      req.id = 1;
      req.body = { oldPassword: "oldpass", newPassword: "newpass" };
      amilRepo.getAmilById.mockResolvedValue({ id: 1, password: "hashed-old" });
      authController.comparePassword.mockResolvedValue(true);
      authController.hashPassword.mockResolvedValue("hashed-new");
      amilRepo.updateAmilPassword.mockResolvedValue(false);

      await controller.updateAmilPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("updates password", async () => {
      req.id = 1;
      req.body = { oldPassword: "oldpass", newPassword: "newpass" };
      amilRepo.getAmilById.mockResolvedValue({ id: 1, password: "hashed-old" });
      authController.comparePassword.mockResolvedValue(true);
      authController.hashPassword.mockResolvedValue("hashed-new");
      amilRepo.updateAmilPassword.mockResolvedValue(true);

      await controller.updateAmilPassword(req, res);

      expect(authController.comparePassword).toHaveBeenCalledWith(
        "oldpass",
        "hashed-old",
      );
      expect(authController.hashPassword).toHaveBeenCalledWith("newpass");
      expect(amilRepo.updateAmilPassword).toHaveBeenCalledWith(1, "hashed-new");
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
