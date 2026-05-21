const pengeluaranZISRepo = require("../../repositories/ZIS_monitoring_repo/penyaluranZIS.repo");
const muzakkiRepo = require("../../repositories/ZIS_monitoring_repo/muzakki.repo");
const pemasukanZISRepo = require("../../repositories/ZIS_monitoring_repo/pemasukanZIS.repo");
const totalZISRepo = require("../../repositories/ZIS_monitoring_repo/totalZIS.repo");
const PemasukanZIS = require("../../models/transaksi/transaksi_zis/pemasukanZIS.models");
const totalZIS = require("../../models/total_kas/totalZIS.models");
const mustahikRepo = require("../../repositories/ZIS_monitoring_repo/mustahik.repo");
const penyaluranZISModel = require("../../models/transaksi/transaksi_zis/penyaluranZIS.models");
const authController = require("../auth/auth.controller");

const getAllPengeluaranZIS = async (req, res) => {
  try {
    const data = (await pengeluaranZISRepo.getAllPengeluaranZIS()).map(
      (item) => new penyaluranZISModel(item),
    );

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran ZIS tidak ditemukan" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPengeluaranZISById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pengeluaranZISRepo.getPengeluaranZISById(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran ZIS tidak ditemukan" });
    }

    res.status(200).json({ data: new penyaluranZISModel(result) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPengeluaranZIS = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res.status(403).json({
        error: "hanya amil zakat yang boleh menambahkan pemasukan ZIS",
      });
    }

    const penyaluranZIS = new penyaluranZISModel({
      mustahik_id: req.body.mustahik_id,
      kategori: req.body.kategori,
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penyaluran: req.body.tanggal_penyaluran,
    });

    const dateStatus = authController.validateDate(
      newPemasukanDasawisma.tanggal_penghimpunan,
    );
    if (!dateStatus) {
      return res
        .status(400)
        .json({ message: "Tanggal penghimpunan tidak boleh melebihi tanggal saat ini" });
    }

    const totalZIS = await totalZISRepo.getTotalZISWhereKategori(
      penyaluranZIS.kategori,
    );

    if (!totalZIS) {
      return res.status(404).json({
        message: "Kategori ZIS tidak ditemukan",
      });
    }

    if (parseFloat(totalZIS.jumlah_keseluruhan) < penyaluranZIS.jumlah) {
      return res.status(400).json({
        message: `Saldo ${penyaluranZIS.kategori} tidak cukup`,
        saldo_tersedia: totalZIS.jumlah_keseluruhan,
        jumlah_diminta: penyaluranZIS.jumlah,
      });
    }

    const mustahik = await mustahikRepo.getMustahikById(
      penyaluranZIS.mustahik_id,
    );
    if (!mustahik) {
      return res.status(404).json({ message: "Mustahik not found" });
    }

    const insertID = await pengeluaranZISRepo.addPengeluaranZIS(penyaluranZIS);

    await totalZISRepo.kurangTotalZIS(
      penyaluranZIS.kategori,
      penyaluranZIS.jumlah,
    );

    res.status(200).json({
      message: "Penyaluran ZIS berhasil ditambahkan",
      data: {
        ...penyaluranZIS,
        id: insertID,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePengeluaranZIS = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res.status(403).json({
        error: "hanya amil zakat yang boleh mengedit pemasukan ZIS",
      });
    }

    const { id } = req.params;
    const penyaluranZIS = new penyaluranZISModel({
      mustahik_id: req.body.mustahik_id,
      kategori: req.body.kategori,
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penyaluran: req.body.tanggal_penyaluran,
    });

    const dateStatus = authController.validateDate(
      penyaluranZIS.tanggal_penyaluran,
    );
    if (!dateStatus) {
      return res
        .status(400)
        .json({ message: "Tanggal penyaluran tidak boleh melebihi tanggal saat ini" });
    }

    const mustahik = await mustahikRepo.getMustahikById(
      penyaluranZIS.mustahik_id,
    );
    if (!mustahik) {
      return res.status(404).json({ message: "Mustahik not found" });
    }

    const existingData = await pengeluaranZISRepo.getPengeluaranZISById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran ZIS tidak ditemukan" });
    }

    const kategoriBerubah = existingData.kategori !== penyaluranZIS.kategori;

    const jumlahBerubah = existingData.jumlah != penyaluranZIS.jumlah;

    if (kategoriBerubah) {
      await totalZISRepo.tambahTotalZIS(
        existingData.kategori,
        existingData.jumlah,
      );

      await totalZISRepo.kurangTotalZIS(
        penyaluranZIS.kategori,
        penyaluranZIS.jumlah,
      );
    } else if (jumlahBerubah) {
      const selisih = penyaluranZIS.jumlah - existingData.jumlah;

      await totalZISRepo.kurangTotalZIS(penyaluranZIS.kategori, selisih);
    }

    await pengeluaranZISRepo.updatePengeluaranZIS(id, penyaluranZIS);

    res.status(200).json({ message: "Penyaluran ZIS berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPengeluaranZIS,
  getPengeluaranZISById,
  addPengeluaranZIS,
  updatePengeluaranZIS,
};
