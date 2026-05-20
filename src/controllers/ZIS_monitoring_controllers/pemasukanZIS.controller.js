const muzakkiRepo = require("../../repositories/ZIS_monitoring_repo/muzakki.repo");
const pemasukanZISRepo = require("../../repositories/ZIS_monitoring_repo/pemasukanZIS.repo");
const totalZISRepo = require("../../repositories/ZIS_monitoring_repo/totalZIS.repo");
const PemasukanZIS = require("../../models/transaksi/transaksi_zis/pemasukanZIS.models");
const totalZIS = require("../../models/total_kas/totalZIS.models");
const authController = require("../auth/auth.controller");

const getAllPemasukanZIS = async (req, res) => {
  try {
    const data = (await pemasukanZISRepo.getAllPemasukanZIS()).map(
      (item) => new PemasukanZIS(item),
    );
    if (data.length === 0) {
      return res.status(404).json({ message: "No pemasukan ZIS found" });
    }

    res.status(200).json({ data: data });
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
    res.status(200).json({ data: new PemasukanZIS(data) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const addPemasukanZIS = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res.status(403).json({
        error: "hanya amil zakat yang boleh menambahkan pemasukan ZIS",
      });
    }

    const newPemasukanZIS = new PemasukanZIS({
      muzakki_id: req.body.muzakki_id,
      kategori: req.body.kategori,
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penghimpunan: req.body.tanggal_penghimpunan,
    });

    const dateStatus = authController.validateDate(
      newPemasukanDasawisma.tanggal_penghimpunan,
    );
    if (!dateStatus.valid) {
      return res
        .status(400)
        .json({ message: "Tanggal penghimpunan tidak boleh melebihi tanggal saat ini" });
    }

    const muzakki = await muzakkiRepo.getMuzakkiById(
      newPemasukanZIS.muzakki_id,
    );
    if (!muzakki) {
      return res.status(404).json({ message: "Muzakki not found" });
    }

    const insertId = await pemasukanZISRepo.addPemasukanZIS(newPemasukanZIS);

    await totalZISRepo.tambahTotalZIS(
      newPemasukanZIS.kategori,
      newPemasukanZIS.jumlah,
    );

    res.status(200).json({
      message: "Pemasukan ZIS added successfully",
      data: {
        ...newPemasukanZIS,
        id: insertId,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding data", error: error.message });
  }
};

const updatePemasukanZIS = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh mengedit pemasukan ZIS" });
    }

    const { id } = req.params.id;

    const pemasukanZIS = new PemasukanZIS({
      muzakki_id: req.body.muzakki_id,
      kategori: req.body.kategori,
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penghimpunan: req.body.tanggal_penghimpunan,
    });

    const dateStatus = authController.validateDate(
      pemasukanZIS.tanggal_penghimpunan,
    );
    if (!dateStatus.valid) {
      return res
        .status(400)
        .json({ message: "Tanggal penghimpunan tidak boleh melebihi tanggal saat ini" });
    }

    const muzakki = await muzakkiRepo.getMuzakkiById(PemasukanZIS.muzakki_id);
    if (!muzakki) {
      return res.status(404).json({ message: "Muzakki not found" });
    }

    const existingData = await pemasukanZISRepo.getPemasukanZISById(id);
    if (!existingData) {
      return res.status(404).json({ message: "Pemasukan ZIS not found" });
    }

    const isJumlahChanged = jumlah !== existingData.jumlah;
    const isKategoriChanged = kategori !== existingData.kategori;

    if (isJumlahChanged || isKategoriChanged) {
      if (isKategoriChanged) {
        await totalZISRepo.updateTotalZIS(
          existingData.kategori,
          -existingData.jumlah,
        );

        await totalZISRepo.updateTotalZIS(kategori, jumlah);
      } else {
        const selisih = jumlah - existingData.jumlah;

        await totalZISRepo.updateTotalZIS(kategori, selisih);
      }
    }
    await pemasukanZISRepo.updatePemasukanZIS(id, pemasukanZIS);

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

const getRiwayatPemasukanZISByNik = async (req, res) => {
  try {
    const nik = req.body?.nik ?? req.query?.nik;
    const last_phone_digits =
      req.body?.last_phone_digits ?? req.query?.last_phone_digits;

    if (!nik || !last_phone_digits) {
      return res.status(400).json({
        message: "nik dan last_phone_digits wajib diisi",
      });
    }

    const muzakki = await muzakkiRepo.getMuzakkiByNik(nik);

    if (!muzakki) {
      return res.status(404).json({
        message: "Muzakki tidak ditemukan",
      });
    }

    const last4Digit = (muzakki.nomor_telpon ?? "").toString().slice(-4);

    if (last4Digit !== last_phone_digits.toString()) {
      return res.status(400).json({
        message: "Validasi nomor telpon gagal",
      });
    }

    const data = await pemasukanZISRepo.getPemasukanZISByMuzakkiId(muzakki.id);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Tidak ada riwayat pemasukan ZIS untuk muzakki ini",
      });
    }

    return res.status(200).json({
      message: "Riwayat pemasukan ZIS berhasil ditemukan",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllPemasukanZIS,
  getPemasukanZISById,
  addPemasukanZIS,
  updatePemasukanZIS,
  deletePemasukanZIS,
  getRiwayatPemasukanZISByNik,
};
