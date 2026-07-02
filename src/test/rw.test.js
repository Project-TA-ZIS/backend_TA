jest.mock("../repositories/rw/rw.repo", () => ({
  getAllRW: jest.fn(),
  getRWById: jest.fn(),
  createRW: jest.fn(),
  deleteRW: jest.fn(),
}));

const controller = require("../controllers/rw/rw.controller");
const rwRepo = require("../repositories/rw/rw.repo");

describe("RW Controller", () => {
  let req;
  let res;

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

    jest.clearAllMocks();
  });

  describe("getAllRW", () => {
    test("returns 404 when RW list is empty", async () => {
      rwRepo.getAllRW.mockResolvedValue([]);

      await controller.getAllRW(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Tidak ada RW ditemukan" });
    });

    test("returns RW list", async () => {
      rwRepo.getAllRW.mockResolvedValue([{ id: 1, nama_rw: "RW 01" }]);

      await controller.getAllRW(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [expect.objectContaining({ id: 1, nama_rw: "RW 01" })],
      });
    });
  });

  describe("getRWById", () => {
    test("returns 404 when RW is not found", async () => {
      req.params = { id: 99 };
      rwRepo.getRWById.mockResolvedValue(null);

      await controller.getRWById(req, res);

      expect(rwRepo.getRWById).toHaveBeenCalledWith(99);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("returns RW detail", async () => {
      req.params = { id: 1 };
      rwRepo.getRWById.mockResolvedValue({ id: 1, nama_rw: "RW 01" });

      await controller.getRWById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({ id: 1, nama_rw: "RW 01" }),
      });
    });
  });

  describe("createRW", () => {
    test("rejects non penanggung jawab dasawisma role", async () => {
      req.roles = "kader dasawisma";

      await controller.createRW(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(rwRepo.createRW).not.toHaveBeenCalled();
    });

    test("validates nama_rw", async () => {
      req.roles = "penanggung jawab dasawisma";

      await controller.createRW(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test("creates RW", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.body = { nama_rw: "RW 01" };
      rwRepo.createRW.mockResolvedValue(1);

      await controller.createRW(req, res);

      expect(rwRepo.createRW).toHaveBeenCalledWith(
        expect.objectContaining({ nama_rw: "RW 01" }),
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "RW created successfully",
        id: 1,
      });
    });
  });

  describe("deleteRW", () => {
    test("rejects non penanggung jawab dasawisma role", async () => {
      req.roles = "kader dasawisma";

      await controller.deleteRW(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(rwRepo.deleteRW).not.toHaveBeenCalled();
    });

    test("returns 404 when RW is not found", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 99 };
      rwRepo.deleteRW.mockResolvedValue(false);

      await controller.deleteRW(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test("deletes RW", async () => {
      req.roles = "penanggung jawab dasawisma";
      req.params = { id: 1 };
      rwRepo.deleteRW.mockResolvedValue(true);

      await controller.deleteRW(req, res);

      expect(rwRepo.deleteRW).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
