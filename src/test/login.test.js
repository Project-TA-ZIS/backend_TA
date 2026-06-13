jest.mock("../repositories/ZIS_monitoring_repo/amil.repo");
jest.mock("../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const authController = require("../controllers/auth/auth.controller");
const amilRepo = require("../repositories/ZIS_monitoring_repo/amil.repo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// C:\CODING\Project_TA\Backend_TA\src\controllers\auth\auth.controller.js
describe("Auth Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: "admin@test.com",
        password: "123456",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Login berhasil sebagai amil", async () => {
    amilRepo.getAmilByEmail.mockResolvedValue({
      id: 1,
      email: "admin@test.com",
      password: "hashedPassword",
      roles: "amil zakat",
    });

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue("fake-token");

    await authController.login(req, res);

    expect(amilRepo.getAmilByEmail).toHaveBeenCalledWith("admin@test.com");

    expect(jwt.sign).toHaveBeenCalled();

    expect(res.json).toHaveBeenCalledWith({
      message: "login berhasil",
      token: "fake-token",
    });
  });

  test("Login gagal karena password salah", async () => {
    amilRepo.getAmilByEmail.mockResolvedValue({
      id: 1,
      password: "hashedPassword",
      roles: "amil zakat",
    });

    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "username atau password salah",
    });
  });

  test("Login gagal karena akun tidak ditemukan", async () => {
    amilRepo.getAmilByEmail.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Akun belum terdaftar",
    });
  });
});
