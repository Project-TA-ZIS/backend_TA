const totalZISRepo = require("../../repositories/ZIS_monitoring_repo/totalZIS.repo");

const getTotalZISByKategori = async (req, res) => {
  try {
    const data = await totalZISRepo.getTotalZISByKategori();
    if (data.length === 0) {
      return res.status(404).json({ message: "No total ZIS data found" });
    }
    res.status(200).json(data);
  }
    catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const getTotalAllPemasukanZIS = async (req, res) => {
  try {
    const total = await totalZISRepo.getTotalAllPemasukanZIS();
    res.status(200).json({ data: total });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  getTotalZISByKategori,
  getTotalAllPemasukanZIS,
};