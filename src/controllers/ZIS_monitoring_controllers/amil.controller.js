const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const authController = require("../auth/auth.controller");

const getAllAmil = async (req, res) => {
  try {
    const data = await amilRepo.getAllAmil();
    if (data.length === 0) {
        return res.status(404).json({ message: "Tidak ada amil ditemukan" });
    }
    
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAmilById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await amilRepo.getAmilById(id);
    if (!data) {
      return res.status(404).json({ message: "Amil not found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAmil = async (req, res) => {
  try {
    const role = req.role;

    if (role !== "koordinator dasawisma") {
      return res
        .status(403)
        .json({
          message: "hanya koordinator dasawisma yang dapat membuat amil",
        });
    }

    const cekEmail = await authController.cekEmail(req.body.email);
    if (cekEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const created = await amilRepo.createAmil(req.body);
    return res.status(200).json({ data: created });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAmil,
  getAmilById,
  createAmil,
};
