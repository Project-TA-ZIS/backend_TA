jest.mock("../repositories/ZIS_monitoring_repo/mustahik.repo", () => ({
  getAllMustahik: jest.fn(),
  getMustahikById: jest.fn(),
  getMustahikByNik: jest.fn(),
  getMustahikByPhone: jest.fn(),
  createMustahik: jest.fn(),
  deleteMustahik: jest.fn(),
  editMustahik: jest.fn(),
}));

const controller = require("../controllers/ZIS_monitoring_controllers/mustahik.controller");
const mustahikRepo = require("../repositories/ZIS_monitoring_repo/mustahik.repo");

const validBody = {
  nama_lengkap: "Aminah",
  nomor_telpon: "081234567890",
  alamat: "Bandung",
  nik: "3273010101010001",
  tempat_lahir: "Bandung",
  tanggal_lahir: "2000-01-01",
  jenis_kelamin: "Perempuan",
  kategori: "fakir",
  status_pekerjaan: "tetap",
  pekerjaan: "Guru",
  penghasilan: 3000000,
  status_pernikahan: "menikah",
};

describe("Mustahik Controller", () => {
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

  describe("getAllMustahik and getMustahikById", () => {
    test("returns 404 when list is empty", async () => {
      mustahikRepo.getAllMustahik.mockResolvedValue([]);

      await controller.getAllMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns mustahik list", async () => {
      mustahikRepo.getAllMustahik.mockResolvedValue([{ id: 1, ...validBody }]);

      await controller.getAllMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [expect.objectContaining({ id: 1, kategori: validBody.kategori })],
      });
    });

    test("returns 404 when id is not found", async () => {
      req.params = { id: 99 };
      mustahikRepo.getMustahikById.mockResolvedValue(null);

      await controller.getMustahikById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns mustahik by id", async () => {
      req.params = { id: 1 };
      mustahikRepo.getMustahikById.mockResolvedValue({ id: 1, ...validBody });

      await controller.getMustahikById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({ id: 1, nik: validBody.nik }),
      });
    });
  });

  describe("createMustahik", () => {
    test("rejects non amil role", async () => {
      req.roles = "kader dasawisma";

      await controller.createMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(mustahikRepo.createMustahik).not.toHaveBeenCalled();
    });

    test("validates required fields", async () => {
      req.roles = "amil zakat";
      req.body = { nama_lengkap: "Aminah" };

      await controller.createMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("handles duplicate NIK as server error", async () => {
      req.roles = "amil zakat";
      req.body = validBody;
      mustahikRepo.getMustahikByNik.mockResolvedValue({ id: 2 });

      await controller.createMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "NIK sudah terdaftar" });
    });

    test("creates mustahik", async () => {
      req.roles = "amil zakat";
      req.body = validBody;
      mustahikRepo.getMustahikByNik.mockResolvedValue(null);
      mustahikRepo.getMustahikByPhone.mockResolvedValue(null);
      mustahikRepo.createMustahik.mockResolvedValue(1);

      await controller.createMustahik(req, res);

      expect(mustahikRepo.createMustahik).toHaveBeenCalledWith(
        expect.objectContaining({
          nama_lengkap: validBody.nama_lengkap,
          nik: validBody.nik,
          kategori: validBody.kategori,
          status_pekerjaan: validBody.status_pekerjaan,
          status_pernikahan: validBody.status_pernikahan,
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deleteMustahik and editMustahik", () => {
    test("rejects delete for non amil role", async () => {
      req.roles = "kader dasawisma";

      await controller.deleteMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("returns 404 when delete target is not found", async () => {
      req.roles = "amil zakat";
      req.params = { id: 99 };
      mustahikRepo.deleteMustahik.mockResolvedValue(false);

      await controller.deleteMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("deletes mustahik", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      mustahikRepo.deleteMustahik.mockResolvedValue(true);

      await controller.deleteMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("rejects edit for non amil role", async () => {
      req.roles = "kader dasawisma";
      req.params = { id: 1 };

      await controller.editMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    test("returns 404 when edit target is not found", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = validBody;
      mustahikRepo.getMustahikByNik.mockResolvedValue(null);
      mustahikRepo.getMustahikByPhone.mockResolvedValue(null);
      mustahikRepo.editMustahik.mockResolvedValue(false);

      await controller.editMustahik(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("edits mustahik", async () => {
      req.roles = "amil zakat";
      req.params = { id: 1 };
      req.body = validBody;
      mustahikRepo.getMustahikByNik.mockResolvedValue({ id: 1 });
      mustahikRepo.getMustahikByPhone.mockResolvedValue({ id: 1 });
      mustahikRepo.editMustahik.mockResolvedValue(true);

      await controller.editMustahik(req, res);

      expect(mustahikRepo.editMustahik).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          nik: validBody.nik,
          kategori: validBody.kategori,
          status_pekerjaan: validBody.status_pekerjaan,
          status_pernikahan: validBody.status_pernikahan,
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
