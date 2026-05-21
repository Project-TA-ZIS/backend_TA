const muzakkiRepo = require("../../repositories/ZIS_monitoring_repo/muzakki.repo");
const authController = require("../auth/auth.controller");
const muzakkiModel = require("../../models/users/muzakki/muzakki.models");

const getAllMuzakki = async (req, res) => {
  try {
    const muzakki = (await muzakkiRepo.getAllMuzakki()).map(
      (item) => new muzakkiModel(item),
    );

    if (muzakki.length === 0) {
      return res.status(404).json({ message: "No muzakki found" });
    }
    res.status(200).json({
      data: muzakki,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMuzakkiById = async (req, res) => {
  try {
    const { id } = req.params;
    const muzakki = await muzakkiRepo.getMuzakkiById(id);
    if (!muzakki) {
      return res.status(404).json({ message: "Muzakki not found" });
    }
    res.status(200).json({
      data: new muzakkiModel(muzakki),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMuzakki = async (req, res) => {
  console.log("Request body:", req.body); // Debug log untuk melihat isi request body
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh menambah muzakki" });
    }

    if (
      !req.body.nama_lengkap ||
      !req.body.email ||
      !req.body.nomor_telpon ||
      !req.body.alamat ||
      !req.body.nik ||
      !req.body.tempat_lahir ||
      !req.body.tanggal_lahir ||
      !req.body.jenis_kelamin ||
      !req.body.pekerjaan
    ) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }


    const muzakkiData = new muzakkiModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      npwp: req.body.npwp,
      nik: req.body.nik,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      jenis_kelamin: req.body.jenis_kelamin,
      pekerjaan: req.body.pekerjaan,
    });

    await validateNewData(muzakkiData);

    const newMuzakkiId = await muzakkiRepo.createMuzakki(muzakkiData);
    res.status(201).json({
      message: "Muzakki created successfully",
      data: {
        ...muzakkiData,
        id: newMuzakkiId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMuzakki = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await muzakkiRepo.deleteMuzakki(id);
    if (!deleted) {
      return res.status(404).json({ message: "Muzakki not found" });
    }
    res.status(200).json({ message: "Muzakki deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editMuzakki = async (req, res) => {
  try {
    const { id } = req.params;

    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh mengedit muzakki" });
    }

    const muzakkiData = new muzakkiModel({
      id: parseInt(id),
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      npwp: req.body.npwp,
      nik: req.body.nik,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      jenis_kelamin: req.body.jenis_kelamin,
      pekerjaan: req.body.pekerjaan,
    });

    await validateNewData(muzakkiData, id);

    const updated = await muzakkiRepo.editMuzakki(id, muzakkiData);
    if (!updated) {
      return res.status(404).json({ message: "Muzakki not found" });
    }

    res
      .status(200)
      .json({ message: "Muzakki updated successfully", data: muzakkiData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateNewData = async (data, currentId = null) => {
  // cek email
  if (data.email) {
    const existingEmail = await muzakkiRepo.getMuzakkiByEmail(data.email);
    if (existingEmail && existingEmail.id !== Number(currentId)) {
      throw new Error("Email sudah terdaftar");
    }
  }

  // Cek NIK
  if (data.nik) {
    const existingNik = await muzakkiRepo.getMuzakkiByNik(data.nik);
    if (existingNik && existingNik.id !== Number(currentId)) {
      throw new Error("NIK sudah terdaftar");
    }
  }
  // Cek nomor telepon
  if (data.nomor_telpon) {
    const existingPhone = await muzakkiRepo.getMuzakkiByNomorTelpon(
      data.nomor_telpon,
    );
    if (existingPhone && existingPhone.id !== Number(currentId)) {
      throw new Error("Nomor telepon sudah terdaftar");
    }
  }
};

module.exports = {
  getAllMuzakki,
  getMuzakkiById,
  createMuzakki,
  deleteMuzakki,
  editMuzakki,
};
