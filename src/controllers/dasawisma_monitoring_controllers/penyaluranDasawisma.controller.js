const pengeluaranDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/penyaluranDasawisma.repo");
const totalDasawismaRepos = require("../../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");
const penyaluranDasawismaModel = require("../../models/transaksi/transaksi_dasawisma/pengeluaranDasawisma");
const authController = require("../auth/auth.controller");

const getAllPengeluaranDasawisma = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma" && role !== "kader dasawisma") {
      return res.status(403).json({
        error:
          "hanya koordinator dan kader dasawisma yang boleh mengakses data pengeluaran Dasawisma",
      });
    }

    const data = (
      await pengeluaranDasawismaRepo.getAllPengeluaranDasawisma()
    ).map((item) => new penyaluranDasawismaModel(item));

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran Dasawisma tidak ditemukan" });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPengeluaranDasawismaById = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma" && role !== "kader dasawisma") {
      return res.status(403).json({
        error:
          "hanya koordinator dan kader dasawisma yang boleh mengakses data pengeluaran Dasawisma",
      });
    }
    const { id } = req.params;
    const result =
      await pengeluaranDasawismaRepo.getPengeluaranDasawismaById(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran Dasawisma tidak ditemukan" });
    }

    res.status(200).json({ data: new penyaluranDasawismaModel(result) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPengeluaranDasawisma = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma yang boleh menambahkan pengeluaran Dasawisma",
      });
    }

    const totalDasawisma = await totalDasawismaRepos.getAllTotalDasawisma();
    console.log(totalDasawisma);
    if (totalDasawisma.jumlah_keseluruhan < req.body.jumlah) {
      return res.status(400).json({
        message: "Total Kas Dasawisma tidak mencukupi untuk pengeluaran ini",
      });
    }

    const penyaluranDasawisma = new penyaluranDasawismaModel({
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penyaluran: req.body.tanggal_penyaluran,
    });

    const dateStatus = authController.validateDate(
      penyaluranDasawisma.tanggal_penyaluran,
    );
    if (!dateStatus) {
      return res
        .status(400)
        .json({
          message: "Tanggal penyaluran tidak boleh melebihi tanggal saat ini",
        });
    }

    const insertedId =
      await pengeluaranDasawismaRepo.addPengeluaranDasawisma(
        penyaluranDasawisma,
      );

    await totalDasawismaRepos.kurangiTotalDasawisma(penyaluranDasawisma.jumlah);

    res.status(200).json({
      message: "Pengeluaran Dasawisma berhasil ditambahkan",
      data: {
        ...penyaluranDasawisma,
        id: insertedId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePengeluaranDasawisma = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma yang boleh mengubah data pengeluaran Dasawisma",
      });
    }
    const { id } = req.params;
    const penyaluranDasawisma = new penyaluranDasawismaModel({
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penyaluran: req.body.tanggal_penyaluran,
    });

    const dateStatus = authController.validateDate(
      penyaluranDasawisma.tanggal_penyaluran,
    );
    if (!dateStatus) {
      return res
        .status(400)
        .json({
          message: "Tanggal penyaluran tidak boleh melebihi tanggal saat ini",
        });
    }

    const result = await pengeluaranDasawismaRepo.updatePengeluaranDasawisma(
      id,
      penyaluranDasawisma,
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message:
          "Data pengeluaran Dasawisma tidak ditemukan atau tidak dapat diupdate",
      });
    }
    res
      .status(200)
      .json({ message: "Pengeluaran Dasawisma berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPengeluaranDasawisma,
  getPengeluaranDasawismaById,
  addPengeluaranDasawisma,
  updatePengeluaranDasawisma,
};
