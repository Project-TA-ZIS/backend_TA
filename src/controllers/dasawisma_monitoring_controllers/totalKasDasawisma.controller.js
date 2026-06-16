const totalKasDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");
const totalKasDasawismaModels = require("../../models/total_kas/totalKasDasawisma.models");

const checkRoles = (roles) => {
  if (roles != "penanggung jawab dasawisma" && roles != "kader dasawisma") {
    return false;
  } else {
    return true;
  }
};

const getTotalKasDasawisma = async (req, res) => {
  try {
    if (!checkRoles(req.roles)) {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh mengakses data total kas dasawisma",
      });
    }

    const data = await totalKasDasawismaRepo.getAllTotalDasawisma();

    if (!data) {
      return res.status(404).json({ message: "Total kas dasawisma not found" });
    }
    res.status(200).json({
      data: new totalKasDasawismaModels({
        id: data.id,
        jumlah_keseluruhan: data.jumlah_keseluruhan,
        updated_at: data.updated_at,
      }),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const getTotalKasDasawismaByRWid = async (req, res) => {
  try {
    if (!checkRoles(req.roles)) {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh mengakses data total kas dasawisma",
      });
    }

    const rw_id = req.rw;
    const data = await totalKasDasawismaRepo.getTotalDasawismaByRWid(rw_id);
    if (!data) {
      return res.status(404).json({ message: "Total kas dasawisma not found" });
    }
    res.status(200).json({
      data: new totalKasDasawismaModels({
        jumlah_keseluruhan: data.jumlah_keseluruhan,
      }),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  getTotalKasDasawisma,
  getTotalKasDasawismaByRWid,
};
