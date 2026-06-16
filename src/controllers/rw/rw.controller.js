const rwModel = require("../../models/rw/rw.models");
const rwRepo = require("../../repositories/rw/rw.repo");

const getAllRW = async (req, res) => {
  try {
    const data = (await rwRepo.getAllRW()).map((item) => new rwModel(item));
    if (data.length === 0) {
      return res.status(404).json({ message: "Tidak ada RW ditemukan" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error fetching RW data:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getRWById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await rwRepo.getRWById(id);
    if (!data) {
      return res.status(404).json({ message: "RW not found" });
    }
    return res.status(200).json({ data: new rwModel(data) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createRW = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        message: "hanya penanggung jawab dasawisma yang dapat membuat RW",
      });
    }
    if (!req.body.nama_rw) {
      return res.status(400).json({
        message: "nama_rw wajib diisi",
      });
    }
    const rwData = new rwModel({
      nama_rw: req.body.nama_rw,
    });
    const newRWId = await rwRepo.createRW(rwData);
    return res
      .status(201)
      .json({ message: "RW created successfully", id: newRWId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRW = async (req, res) => {
  try {
    const roles = req.roles;
    if (roles !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        message: "hanya penanggung jawab dasawisma yang dapat menghapus RW",
      });
    }
    const id = req.params.id;
    const success = await rwRepo.deleteRW(id);
    if (!success) {
      return res.status(404).json({ message: "RW not found" });
    }
    return res.status(200).json({ message: "RW deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRW,
  getRWById,
  createRW,
  deleteRW,
};
