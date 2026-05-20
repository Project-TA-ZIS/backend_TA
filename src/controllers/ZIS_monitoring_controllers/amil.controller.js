const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const authController = require("../auth/auth.controller");
const amilModel = require("../../models/users/amil/amil.models");

const getAllAmil = async (req, res) => {
  try {
    const data = (await amilRepo.getAllAmil()).map(
      (item) => new amilModel(item),
    );
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
    return res.status(200).json({ data: new amilModel(data) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAmil = async (req, res) => {
  try {
    const roles = req.roles;

    if (roles !== "koordinator dasawisma") {
      return res.status(403).json({
        message: "hanya koordinator dasawisma yang dapat membuat amil",
      });
    }

    if (
      !req.body.nama_lengkap ||
      !req.body.email ||
      !req.body.password ||
      !req.body.nomor_telpon
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

    const newAmil = new amilModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      password: req.body.password,
    });

    await validateNewData(newAmil);

    const created = await amilRepo.createAmil(newAmil);
    return res.status(200).json({
      message: "Amil created successfully",
      data: {
        ...newAmil,
        id: created,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAmil = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = req.roles;

    if (roles !== "koordinator dasawisma") {
      return res
        .status(403)

        .json({
          message: "hanya koordinator dasawisma yang dapat menghapus amil",
        });
    }
    const data = await amilRepo.deleteAmil(id);
    if (!data) {
      return res.status(404).json({ message: "Amil not found" });
    }
    return res.status(200).json({ message: "Amil deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAmil = async (req, res) => {
  try {
    const id = req.params.id;

    const cekAmil = await amilRepo.getAmilById(id);
    if (!cekAmil) {
      return res.status(404).json({ message: "Amil not found" });
    }

    const newData = new amilModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
    });

    await validateNewData(newData, id);

    const updated = await amilRepo.updateAmil(id, newData);
    if (!updated) {
      return res.status(400).json({ message: "Failed to update amil" });
    }
    return res.status(200).json({
      message: "Amil updated successfully",
      status: updated,
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const validateNewData = async (data, currentId = null) => {
  if (data.email) {
    const existingEmail = await amilRepo.getAmilByEmail(data.email);

    if (existingEmail && existingEmail.id !== Number(currentId)) {
      throw new Error("Email sudah terdaftar");
    }
  }

  if (data.nomor_telpon) {
    const existingNomorTelpon = await amilRepo.getAmilbyNomorTelpon(
      data.nomor_telpon,
    );

    if (existingNomorTelpon && existingNomorTelpon.id !== Number(currentId)) {
      throw new Error("Nomor telpon sudah terdaftar");
    }
  }
};

const updateAmilPassword = async (req, res) => {
  try {
    const id = req.id;
    const { oldPassword, newPassword } = req.body;

    const cekAmil = await amilRepo.getAmilById(id);
    if (!cekAmil) {
      return res.status(404).json({ message: "Amil not found" });
    }

    const isPasswordValid = await authController.comparePassword(
      oldPassword,
      cekAmil.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await authController.hashPassword(newPassword);
    const updated = await amilRepo.updateAmilPassword(id, hashedPassword);
    if (!updated) {
      return res.status(400).json({ message: "Failed to update password" });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAmil,
  getAmilById,
  createAmil,
  deleteAmil,
  updateAmil,
  updateAmilPassword,
};
