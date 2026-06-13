jest.mock(
  "../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo",
  () => ({
    getAllTotalDasawisma: jest.fn(),
  }),
);

const controller = require("../controllers/dasawisma_monitoring_controllers/totalKasDasawisma.controller");
const totalKasRepo = require("../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");

describe("Total Kas Dasawisma Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      roles: "",
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  test("getTotalKasDasawisma forbidden", async () => {
    req.roles = "amil zakat";

    await controller.getTotalKasDasawisma(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh mengakses data total kas dasawisma",
    });
  });

  test("getTotalKasDasawisma not found", async () => {
    req.roles = "kader dasawisma";

    totalKasRepo.getAllTotalDasawisma.mockResolvedValue(null);

    await controller.getTotalKasDasawisma(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Total kas dasawisma not found",
    });
  });

  test("getTotalKasDasawisma success", async () => {
    req.roles = "kader dasawisma";

    totalKasRepo.getAllTotalDasawisma.mockResolvedValue({
      id: 1,
      jumlah_keseluruhan: 500000,
      updated_at: "2026-06-13",
    });

    await controller.getTotalKasDasawisma(req, res);

    expect(totalKasRepo.getAllTotalDasawisma).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          id: 1,
          jumlah_keseluruhan: 500000,
        }),
      }),
    );
  });

  test("getTotalKasDasawisma internal server error", async () => {
    req.roles = "kader dasawisma";

    totalKasRepo.getAllTotalDasawisma.mockRejectedValue(
      new Error("Database Error"),
    );

    await controller.getTotalKasDasawisma(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
