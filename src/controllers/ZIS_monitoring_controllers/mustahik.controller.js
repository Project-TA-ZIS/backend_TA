const mustahikRepo = require("../../repositories/ZIS_monitoring_repo/mustahik.repo");
const authController = require("../auth/auth.controller");
const mustahikModel = require("../../models/mustahik/mustahik.models");

const getAllMustahik = async (req, res) => {
  try {
    const mustahik = (await mustahikRepo.getAllMustahik()).map(
      (item) => new mustahikModel(item),
    );

    if (mustahik.length === 0) {
      return res.status(404).json({ error: "No mustahik found" });
    }

    res.status(200).json({ data: mustahik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMustahikById = async (req, res) => {
  const { id } = req.params;

  try {
    const mustahik = await mustahikRepo.getMustahikById(id);
    if (mustahik) {
      res.status(200).json({ data: new mustahikModel(mustahik) });
    } else {
      res.status(404).json({ error: "Mustahik not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMustahik = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh menambah mustahik" });
    }

    if (
      !req.body.nama_lengkap ||
      !req.body.nomor_telpon ||
      !req.body.alamat ||
      !req.body.nik ||
      !req.body.tempat_lahir ||
      !req.body.tanggal_lahir ||
      !req.body.jenis_kelamin ||
      !req.body.kategori
    ) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    if (req.body.password.length < 6) {
      return res.status(400).json({
        message: "Password minimal 6 karakter",
      });
    }

    const mustahikData = new mustahikModel({
      nama_lengkap: req.body.nama_lengkap,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      nik: req.body.nik,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      jenis_kelamin: req.body.jenis_kelamin,
      kategori: req.body.kategori,
    });

    await validateNewData(mustahikData);

    const newMustahik = await mustahikRepo.createMustahik(mustahikData);
    res.status(200).json({
      message: "Mustahik created successfully",
      data: {
        ...mustahikData,
        id: newMustahik,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMustahik = async (req, res) => {
  const { id } = req.params;
  const roles = req.roles;
  try {
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh menghapus mustahik" });
    }
    const deleted = await mustahikRepo.deleteMustahik(id);
    if (deleted) {
      res.status(200).json({ message: "Mustahik deleted successfully" });
    } else {
      res.status(404).json({ message: "Mustahik not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editMustahik = async (req, res) => {
  try {
    const { id } = req.params;

    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh mengedit mustahik" });
    }

    const mustahikData = new mustahikModel({
      nama_lengkap: req.body.nama_lengkap,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      nik: req.body.nik,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      jenis_kelamin: req.body.jenis_kelamin,
      kategori: req.body.kategori,
    });

    await validateNewData(mustahikData, id);

    const updatedMustahik = await mustahikRepo.editMustahik(id, mustahikData);
    if (updatedMustahik) {
      res.status(200).json({
        message: "Mustahik updated successfully",
        status: updatedMustahik,
        data: mustahikData,
      });
    } else {
      res.status(404).json({ message: "Mustahik not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateNewData = async (data, currentId = null) => {
  // Cek NIK
  if (data.nik) {
    const existingNik = await mustahikRepo.getMustahikByNik(data.nik);
    if (existingNik && existingNik.id !== Number(currentId)) {
      throw new Error("NIK sudah terdaftar");
    }
  }
  // Cek nomor telepon
  if (data.nomor_telpon) {
    const existingPhone = await mustahikRepo.getMustahikByPhone(
      data.nomor_telpon,
    );
    if (existingPhone && existingPhone.id !== Number(currentId)) {
      throw new Error("Nomor telepon sudah terdaftar");
    }
  }
};

module.exports = {
  getAllMustahik,
  getMustahikById,
  createMustahik,
  deleteMustahik,
  editMustahik,
};
