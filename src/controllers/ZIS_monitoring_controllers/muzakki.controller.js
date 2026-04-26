const muzakkiRepo = require("../../repositories/ZIS_monitoring_repo/muzakki.repo");
const authController = require("../auth/auth.controller");

const getAllMuzakki = async (req, res) => {
  try {
    const muzakki = await muzakkiRepo.getAllMuzakki();
    if (muzakki.length === 0) {
      return res.status(404).json({ message: "No muzakki found" });
    }
    res.status(200).json(muzakki);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMuzakkiById = async (req, res) => {
  const { id } = req.params;
  try {
    const muzakki = await muzakkiRepo.getMuzakkiById(id);
    if (!muzakki) {
      return res.status(404).json({ message: "Muzakki not found" });
    }
    res.status(200).json(muzakki);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMuzakki = async (req, res) => {
  const muzakkiData = req.body;
  try {
    const roles = req.roles;
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh menambah muzakki" });
    }

    const cekNik = await authController.cekNIK(muzakkiData.nik);
    if (cekNik) {
      return res.status(400).json({ message: "NIK sudah terdaftar" });
    }

    const newMuzakkiId = await muzakkiRepo.createMuzakki(muzakkiData);
    res
      .status(201)
      .json({ message: "Muzakki created successfully", id: newMuzakkiId });
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

module.exports = {
  getAllMuzakki,
  getMuzakkiById,
  createMuzakki,
  deleteMuzakki,
};
