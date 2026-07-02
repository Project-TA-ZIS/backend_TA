jest.mock("../repositories/ZIS_monitoring_repo/muzakki.repo", () => ({
  getAllMuzakki: jest.fn(),
  getMuzakkiById: jest.fn(),
  getMuzakkiByNik: jest.fn(),
  getMuzakkiByEmail: jest.fn(),
  getMuzakkiByNomorTelpon: jest.fn(),
  createMuzakki: jest.fn(),
  deleteMuzakki: jest.fn(),
  editMuzakki: jest.fn(),
}));

const controller = require("../controllers/ZIS_monitoring_controllers/muzakki.controller");
const muzakkiRepo = require("../repositories/ZIS_monitoring_repo/muzakki.repo");

const validBody = {
  nama_lengkap: "Rafif",
  email: "rafif@test.com",
  nomor_telpon: "081234567890",
  alamat: "Bandung",
  npwp: "123",
  nik: "3273010101010001",
  tempat_lahir: "Bandung",
  tanggal_lahir: "2000-01-01",
  jenis_kelamin: "Laki-laki",
  pekerjaan: "Karyawan",
};

describe("Muzakki Controller", () => {
  let req;
  let res;
  let consoleErrorSpy;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      roles: "",
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("getAllMuzakki", () => {
    test("returns 404 when data is empty", async () => {
      muzakkiRepo.getAllMuzakki.mockResolvedValue([]);

      await controller.getAllMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns muzakki list", async () => {
      muzakkiRepo.getAllMuzakki.mockResolvedValue([{ id: 1, ...validBody }]);

      await controller.getAllMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [expect.objectContaining({ id: 1, email: validBody.email })],
      });
    });
  });

  describe("getMuzakkiById and getMuzakkiByNik", () => {
    test("returns 404 when id is not found", async () => {
      req.params = { id: 99 };
      muzakkiRepo.getMuzakkiById.mockResolvedValue(null);

      await controller.getMuzakkiById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns muzakki by id", async () => {
      req.params = { id: 1 };
      muzakkiRepo.getMuzakkiById.mockResolvedValue({ id: 1, ...validBody });

      await controller.getMuzakkiById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({ id: 1, nik: validBody.nik }),
      });
    });

    test("returns 404 when nik is not found", async () => {
      req.params = { nik: validBody.nik };
      muzakkiRepo.getMuzakkiByNik.mockResolvedValue(null);

      await controller.getMuzakkiByNik(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: false,
        message: "Data NIK tidak ditemukan.",
      });
    });
  });

  describe("createMuzakki", () => {
    test("rejects non amil role", async () => {
      req.roles = "kader dasawisma";

      await controller.createMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(muzakkiRepo.createMuzakki).not.toHaveBeenCalled();
    });

    test("validates required fields", async () => {
      req.roles = "amil zakat";
      req.body = { nama_lengkap: "Rafif" };

      await controller.createMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("rejects duplicate email", async () => {
      req.roles = "amil zakat";
      req.body = validBody;
      muzakkiRepo.getMuzakkiByEmail.mockResolvedValue({ id: 2 });

      await controller.createMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email sudah terdaftar" });
    });

    test("creates muzakki", async () => {
      req.roles = "amil zakat";
      req.body = validBody;
      muzakkiRepo.getMuzakkiByEmail.mockResolvedValue(null);
      muzakkiRepo.getMuzakkiByNik.mockResolvedValue(null);
      muzakkiRepo.getMuzakkiByNomorTelpon.mockResolvedValue(null);
      muzakkiRepo.createMuzakki.mockResolvedValue(1);

      await controller.createMuzakki(req, res);

      expect(muzakkiRepo.createMuzakki).toHaveBeenCalledWith(
        expect.objectContaining({
          nama_lengkap: validBody.nama_lengkap,
          email: validBody.email,
          nik: validBody.nik,
        }),
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("deleteMuzakki and editMuzakki", () => {
    test("returns 404 when delete target is not found", async () => {
      req.params = { id: 99 };
      muzakkiRepo.deleteMuzakki.mockResolvedValue(false);

      await controller.deleteMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("deletes muzakki", async () => {
      req.params = { id: 1 };
      muzakkiRepo.deleteMuzakki.mockResolvedValue(true);

      await controller.deleteMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("rejects edit for non amil role", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      await controller.editMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("returns 404 when edit target is not found", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = validBody;
      muzakkiRepo.getMuzakkiByEmail.mockResolvedValue(null);
      muzakkiRepo.getMuzakkiByNik.mockResolvedValue(null);
      muzakkiRepo.getMuzakkiByNomorTelpon.mockResolvedValue(null);
      muzakkiRepo.editMuzakki.mockResolvedValue(false);

      await controller.editMuzakki(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("edits muzakki", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = validBody;
      muzakkiRepo.getMuzakkiByEmail.mockResolvedValue({ id: 1 });
      muzakkiRepo.getMuzakkiByNik.mockResolvedValue({ id: 1 });
      muzakkiRepo.getMuzakkiByNomorTelpon.mockResolvedValue({ id: 1 });
      muzakkiRepo.editMuzakki.mockResolvedValue(true);

      await controller.editMuzakki(req, res);

      expect(muzakkiRepo.editMuzakki).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ id: 1, email: validBody.email }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
