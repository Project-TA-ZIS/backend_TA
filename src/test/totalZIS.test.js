jest.mock("../repositories/ZIS_monitoring_repo/totalZIS.repo", () => ({
  getTotalZISByKategori: jest.fn(),
  getTotalAllPemasukanZIS: jest.fn(),
}));

const controller = require("../controllers/ZIS_monitoring_controllers/totalZIS.controller");
const totalZISRepo = require("../repositories/ZIS_monitoring_repo/totalZIS.repo");

describe("Total ZIS Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("getTotalZISByKategori", () => {
    test("returns 404 when data is empty", async () => {
      totalZISRepo.getTotalZISByKategori.mockResolvedValue([]);

      await controller.getTotalZISByKategori(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No total ZIS data found" });
    });

    test("returns total ZIS grouped by kategori", async () => {
      totalZISRepo.getTotalZISByKategori.mockResolvedValue([
        {
          id: 1,
          kategori: "zakat mal",
          jumlah_keseluruhan: 100000,
          updated_at: "2026-01-01",
        },
      ]);

      await controller.getTotalZISByKategori(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [
          expect.objectContaining({
            id: 1,
            kategori: "zakat mal",
            jumlah_keseluruhan: 100000,
          }),
        ],
      });
    });

    test("handles repository error", async () => {
      totalZISRepo.getTotalZISByKategori.mockRejectedValue(new Error("DB down"));

      await controller.getTotalZISByKategori(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: "DB down",
      });
    });
  });

  describe("getTotalAllPemasukanZIS", () => {
    test("returns total uang and beras", async () => {
      totalZISRepo.getTotalAllPemasukanZIS.mockResolvedValue({
        total_uang: "250000",
        total_beras: "35",
        updated_at: "2026-01-01",
      });

      await controller.getTotalAllPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          total_uang_zis: 250000,
          total_beras_zakat: 35,
          updated_at: "2026-01-01",
        },
      });
    });

    test("handles repository error", async () => {
      totalZISRepo.getTotalAllPemasukanZIS.mockRejectedValue(new Error("DB down"));

      await controller.getTotalAllPemasukanZIS(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: "DB down",
      });
    });
  });
});
