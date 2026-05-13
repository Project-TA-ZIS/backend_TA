const totalZISRepo = require("../../repositories/ZIS_monitoring_repo/totalZIS.repo");
const totalKasZIS = require("../../models/transaksi/transaksi_zis/totalPengeluaranZIS.models");

const getTotalZISByKategori = async (req, res) => {
  try {
    const data = (await totalZISRepo.getTotalZISByKategori()).map(
      (item) => new totalKasZIS(item),
    );
    console.log(data);

    if (data.length === 0) {
      return res.status(404).json({ message: "No total ZIS data found" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const getTotalAllPemasukanZIS = async (req, res) => {
  try {
    const data = await totalZISRepo.getTotalAllPemasukanZIS();
    res.status(200).json({
      data: new totalKasZIS({
        id: data.id,
        jumlah_keseluruhan: data.total,
        updated_at: data.updated_at,
      }),
    });
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
