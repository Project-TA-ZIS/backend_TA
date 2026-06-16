const anggotaRepo = require("../../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const authController = require("../auth/auth.controller");
const anggotaDasawismaModel = require("../../models/users/dasawisma/dasawisma.models");
const { formatDateInput } = require("../../utils/formatDateInput");

const getAllAnggotaDasawisma = async (req, res) => {
  try {
    const data = (await anggotaRepo.getAllAnggotaDasawisma()).map(
      (item) => new anggotaDasawismaModel(item),
    );
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada kader dasawisma ditemukan" });
    }

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnggotaDasawismaById = async (req, res) => {
  try {
    const id = req.params.id;
    const rw_id = req.rw;

    const data = await anggotaRepo.getAnggotaDasawismaById(id);
    if (!data) {
      return res.status(404).json({ message: "Anggota not found" });
    }
    return res.status(200).json({ data: new anggotaDasawismaModel(data) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnggotaDasawismaByRWid = async (req, res) => {
  try {
    const rw_id = req.rw;
    const data = (await anggotaRepo.getAnggotaDasawismaByRWid(rw_id)).map(
      (item) => new anggotaDasawismaModel(item),
    );
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada kader dasawisma ditemukan untuk RW ini" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPenanggungJawabByRWid = async (req, res) => {
  try {
    const rw_id = req.rw;
    const data = await anggotaRepo.getPenanggungJawabByRWid(rw_id);
    if (!data) {
      return res.status(404).json({
        message: "Tidak ada penanggung jawab dasawisma ditemukan untuk RW ini",
      });
    }

    return res.status(200).json({ data: new anggotaDasawismaModel(data) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAnggotaDasawisma = async (req, res) => {
  try {
    const roles = req.roles;

    if (roles !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        message:
          "hanya penanggung jawab dasawisma yang dapat membuat anggota atau penanggung jawab dasawisma",
      });
    }

    if (!req.body.nama_lengkap || !req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    if (req.body.password.length < 6) {
      return res.status(400).json({
        message: "Password minimal 6 karakter",
      });
    }

    const data = new anggotaDasawismaModel({
      nama_lengkap: req.body.nama_lengkap,
      rw_id: req.body.rw_id,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      password: req.body.password,
      roles: req.body.roles,
    });

    await validateNewData(data);

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

    if (roles !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        message:
          "hanya penanggung jawab dasawisma yang dapat menghapus anggota atau penanggung jawab dasawisma",
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

const updateProfileAnggota = async (req, res) => {
  try {
    const id = req.params.id;
    const tanggal_lahir = formatDateInput(req.body.tanggal_lahir);

    const newData = new anggotaDasawismaModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      alamat: req.body.alamat,
      nik: req.body.nik,
      roles: req.body.roles,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: tanggal_lahir,
    });

    await validateNewData(newData, id);

    const updated = await anggotaRepo.updateAnggotaDasawisma(id, newData);
    if (!updated) {
      return res.status(404).json({ message: "Anggota not found" });
    }
    return res
      .status(200)
      .json({ message: "Anggota berhasil diupdate", data: updated });
  } catch (error) {
    console.error("Error updating anggota dasawisma:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateAnggotaByPJ = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = req.roles;

    if (roles !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        message:
          "hanya penanggung jawab dasawisma yang dapat mengupdate anggota atau penanggung jawab dasawisma",
      });
    }

    const newData = new anggotaDasawismaModel({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      nomor_telpon: req.body.nomor_telpon,
      roles: req.body.roles,
      rw_id: req.body.rw_id,
    });

    await validateNewData(newData, id);

    const updated = await anggotaRepo.updateAnggotaByPJ(id, newData);
    if (!updated) {
      return res.status(404).json({ message: "Anggota not found" });
    }

    return res
      .status(200)
      .json({ message: "Anggota berhasil diupdate", data: updated });
  } catch (error) {
    console.error("Error updating anggota dasawisma:", error);
    return res.status(500).json({ message: error.message });
  }
};

const validateNewData = async (data, currentId = null) => {
  // cek email
  if (data.email) {
    const emailExist = await anggotaRepo.getAnggotaDasawismaByEmail(data.email);

    if (emailExist && emailExist.id != Number(currentId)) {
      throw new Error("Email sudah terdaftar");
    }
  }

  // cek nik
  if (data.nik) {
    const nikExist = await anggotaRepo.getAnggotaDasawismaByNik(data.nik);

    if (nikExist && nikExist.id != Number(currentId)) {
      throw new Error("NIK sudah terdaftar");
    }
  }

  // cek nomor telpon
  if (data.nomor_telpon) {
    const phoneExist = await anggotaRepo.getAnggotaDasawismaByPhone(
      data.nomor_telpon,
    );

    if (phoneExist && phoneExist.id != Number(currentId)) {
      throw new Error("Nomor telpon sudah terdaftar");
    }
  }
};

const updatePassword = async (req, res) => {
  try {
    const id = req.id;
    const { oldPassword, newPassword } = req.body;

    const anggota = await anggotaRepo.getAnggotaDasawismaById(id);
    if (!anggota) {
      return res.status(404).json({ message: "Anggota not found" });
    }

    const isPasswordValid = await authController.comparePassword(
      oldPassword,
      anggota.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password lama salah" });
    }

    const hashedPassword = await authController.hashPassword(newPassword);
    const updated = await anggotaRepo.updatePassword(id, hashedPassword);

    if (!updated) {
      return res.status(404).json({ message: "Anggota not found" });
    }

    return res.status(200).json({ message: "Password berhasil diupdate" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAnggotaDasawisma,
  getAnggotaDasawismaById,
  getAnggotaDasawismaByRWid,
  createAnggotaDasawisma,
  deleteAnggotaDasawisma,
  updateProfileAnggota,
  updateAnggotaByPJ,
  updatePassword,
  getPenanggungJawabByRWid,
};
