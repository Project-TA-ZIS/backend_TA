const anggotaRepo = require("../../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const authController = require("../auth/auth.controller");

const getAllAnggotaDasawisma = async (req, res) => {
  try {
    const data = await anggotaRepo.getAllAnggotaDasawisma();
    if (data.length === 0) {
        return res.status(404).json({ message: "Tidak ada anggota dasawisma ditemukan" });
    }
    
    return res.status(200).json({ data });
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
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAnggotaDasawisma = async (req, res) => {
  try {
    const roles = req.roles;

    if (roles !== "koordinator dasawisma") {
      return res
        .status(403)
        .json({
          message:
            "hanya koordinator dasawisma yang dapat membuat anggota atau koordinator dasawisma",
        });
    }

    const cekEmail = await authController.cekEmail(req.body.email);
    if (cekEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const created = await anggotaRepo.createAnggotaDasawisma(req.body);
    return res.status(200).json({ data: created });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAnggotaDasawisma = async (req, res) => {
  try {
    const roles = req.roles;

    if (roles !== "koordinator dasawisma") {
      return res
        .status(403)
        .json({
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


module.exports = {
  getAllAnggotaDasawisma,
  getAnggotaDasawismaById,
  createAnggotaDasawisma,
  deleteAnggotaDasawisma
};
