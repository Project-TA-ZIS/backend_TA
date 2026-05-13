const anggotaRepo = require("../../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const authController = require("../auth/auth.controller");
const anggotaDasawismaModel = require("../../models/users/dasawisma/dasawisma.models");

const getAllAnggotaDasawisma = async (req, res) => {
  try {
    const data = (await anggotaRepo.getAllAnggotaDasawisma()).map(
      (item) => new anggotaDasawismaModel(item),
    );
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada anggota dasawisma ditemukan" });
    }

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnggotaDasawismaById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await anggotaRepo.getAnggotaDasawismaById(id);
    if (!data) {
      return res.status(404).json({ message: "Anggota not found" });
    }
    return res.status(200).json({ data: new anggotaDasawismaModel(data) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAnggotaDasawisma = async (req, res) => {
  try {
    const roles = req.roles;

    if (roles !== "koordinator dasawisma") {
      return res.status(403).json({
        message:
          "hanya koordinator dasawisma yang dapat membuat anggota atau koordinator dasawisma",
      });
    }

    const cekEmail = await authController.cekEmail(req.body.email);
    if (cekEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const data = new anggotaDasawismaModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles,
    });

    const created = await anggotaRepo.createAnggotaDasawisma(data);
    return res.status(200).json({
      data: {
        ...data,
        id: created,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAnggotaDasawisma = async (req, res) => {
  try {
    const roles = req.roles;

    if (roles !== "koordinator dasawisma") {
      return res.status(403).json({
        message:
          "hanya koordinator dasawisma yang dapat menghapus anggota atau koordinator dasawisma",
      });
    }

    const id = req.params.id;
    const deleted = await anggotaRepo.deleteAnggotaDasawisma(id);
    if (!deleted) {
      return res.status(404).json({ message: "Anggota not found" });
    }
    return res.status(200).json({ message: "Anggota berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAnggotaDasawisma = async (req, res) => {
  try {
    const id = req.params.id;

    const newData = new anggotaDasawismaModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      nik: req.body.nik,
      roles: req.body.roles,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
    });

    const updated = await anggotaRepo.updateAnggotaDasawisma(id, newData);
    if (!updated) {
      return res.status(404).json({ message: "Anggota not found" });
    }
    return res
      .status(200)
      .json({ message: "Anggota berhasil diupdate", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAnggotaDasawisma,
  getAnggotaDasawismaById,
  createAnggotaDasawisma,
  deleteAnggotaDasawisma,
  updateAnggotaDasawisma,
};
