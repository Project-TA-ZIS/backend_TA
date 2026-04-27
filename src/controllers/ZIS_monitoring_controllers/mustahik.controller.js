const mustahikRepo = require("../../repositories/ZIS_monitoring_repo/mustahik.repo");
const authController = require("../auth/auth.controller");

const getAllMustahik = async (req, res) => {
  try {
    const mustahik = await mustahikRepo.getAllMustahik();

    if (mustahik.length === 0) {
      return res.status(404).json({ error: "No mustahik found" });
    }

    res.status(200).json(mustahik);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMustahikById = async (req, res) => {
  const { id } = req.params;
  try {
    const mustahik = await mustahikRepo.getMustahikById(id);
    if (mustahik) {
      res.status(200).json(mustahik);
    } else {
      res.status(404).json({ error: "Mustahik not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMustahik = async (req, res) => {
  const mustahikData = req.body;
  const roles = req.roles;

  try {
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh menambah mustahik" });
    }

    const cekNik = await authController.cekNIK(mustahikData.nik);
    
    if (cekNik) {
      return res.status(400).json({ message: "NIK sudah terdaftar" });
    }

    const newMustahik = await mustahikRepo.createMustahik(mustahikData);
    res.status(200).json({
      message: "Mustahik created successfully",
      data: newMustahik,
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
  const { id } = req.params;
  const mustahikData = req.body;
  const roles = req.roles;
  try {
    if (roles != "amil zakat") {
      return res
        .status(403)
        .json({ error: "hanya amil zakat yang boleh mengedit mustahik" });
    }
    const updatedMustahik = await mustahikRepo.editMustahik(id, mustahikData);
    if (updatedMustahik) {
      res.status(200).json({ message: "Mustahik updated successfully", status: updatedMustahik, data: mustahikData });
    } else {
      res.status(404).json({ message: "Mustahik not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMustahik,
  getMustahikById,
  createMustahik,
  deleteMustahik,
  editMustahik
};
