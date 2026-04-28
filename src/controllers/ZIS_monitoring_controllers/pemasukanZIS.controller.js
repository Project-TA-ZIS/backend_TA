const muzakkiRepo = require("../../repositories/ZIS_monitoring_repo/muzakki.repo");
const pemasukanZISRepo = require("../../repositories/ZIS_monitoring_repo/pemasukanZIS.repo");
const totalZISRepo = require("../../repositories/ZIS_monitoring_repo/totalZIS.repo");
const PemasukanZIS = require("../../models/transaksi/transaksi_zis/pemasukanZIS.models");
const totalZIS = require("../../models/total_kas/totalZIS.models");

const getAllPemasukanZIS = async (req, res) => {
  try {
    const data = await pemasukanZISRepo.getAllPemasukanZIS();
    if (data.length === 0) {
      return res.status(404).json({ message: "No pemasukan ZIS found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const getPemasukanZISById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pemasukanZISRepo.getPemasukanZISById(id);
    if (!data) {
      return res.status(404).json({ message: "Pemasukan ZIS not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const addPemasukanZIS = async (req, res) => {
  try {
    const { muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan } =
      req.body;

    const roles = req.roles;
    console.log(req.body)
    if (roles != "amil zakat") {
      return res.status(403).json({
        error: "hanya amil zakat yang boleh menambahkan pemasukan ZIS",
      });
    }

    const muzakki = await muzakkiRepo.getMuzakkiById(muzakki_id);
    if (!muzakki) {
      return res.status(404).json({ message: "Muzakki not found" });
    }

    const data = await pemasukanZISRepo.addPemasukanZIS({
      muzakki_id,
      kategori,
      jumlah,
      deskripsi,
      tanggal_penghimpunan,
    });
    await totalZISRepo.updateTotalZIS(kategori, jumlah);
    res
      .status(200)
      .json({ message: "Pemasukan ZIS added successfully", id: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding data", error: error.message });
  }
};

const updatePemasukanZIS = async (req, res) => {
  try {
    const id = req.params.id;
    const { muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan } =
      req.body;

    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh mengedit pemasukan ZIS" });
    }

    const muzakki = await muzakkiRepo.getMuzakkiById(muzakki_id);
    if (!muzakki) {
      return res.status(404).json({ message: "Muzakki not found" });
    }

    const existingData = await pemasukanZISRepo.getPemasukanZISById(id);
    if (!existingData) {
      return res.status(404).json({ message: "Pemasukan ZIS not found" });
    }

    // ✅ UPDATE DATA DULU
    await pemasukanZISRepo.updatePemasukanZIS(id, {
      muzakki_id,
      kategori,
      jumlah,
      deskripsi,
      tanggal_penghimpunan,
    });

    // 🔥 CEK PERUBAHAN
    const isJumlahChanged = jumlah !== existingData.jumlah;
    const isKategoriChanged = kategori !== existingData.kategori;

    // ✅ HANYA UPDATE TOTAL JIKA PERLU
    if (isJumlahChanged || isKategoriChanged) {
      // ❗ Kalau kategori berubah → lebih kompleks
      if (isKategoriChanged) {
        // kurangi kategori lama
        await totalZISRepo.updateTotalZIS(
          existingData.kategori,
          -existingData.jumlah,
        );

        // tambah ke kategori baru
        await totalZISRepo.updateTotalZIS(kategori, jumlah);
      } else {
        // hanya jumlah berubah
        const selisih = jumlah - existingData.jumlah;

        await totalZISRepo.updateTotalZIS(kategori, selisih);
      }
    }

    res.status(200).json({ message: "Pemasukan ZIS updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating data",
      error: error.message,
    });
  }
};

const deletePemasukanZIS = async (req, res) => {
  try {
    const id = req.params.id;

    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh menghapus pemasukan ZIS" });
    }

    const existingData = await pemasukanZISRepo.getPemasukanZISById(id);

    if (!existingData) {
      return res.status(404).json({ message: "Pemasukan ZIS not found" });
    }

    await pemasukanZISRepo.deletePemasukanZIS(id);
    await totalZISRepo.updateTotalZIS(
      existingData.kategori,
      -existingData.jumlah,
    );
    res.status(200).json({ message: "Pemasukan ZIS deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting data",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPemasukanZIS,
  getPemasukanZISById,
  addPemasukanZIS,
  updatePemasukanZIS,
  deletePemasukanZIS,
};
