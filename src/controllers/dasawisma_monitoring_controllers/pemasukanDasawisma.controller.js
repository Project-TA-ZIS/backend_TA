const pemasukanDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/pemasukanDasawisma.repo");
const PemasukanDasawismaModels = require("../../models/transaksi/transaksi_dasawisma/pemasukanDasawisma");
const totalKasDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");

const checkRoles = (roles) => {
  if (roles != "koordinator dasawisma" && roles != "anggota dasawisma") {
    return false;
  } else {
    return true;
  }
};

const getAllPemasukanDasawisma = async (req, res) => {
  try {
    const roles = req.roles;
    if (!checkRoles(roles)) {
      return res.status(403).json({
        error:
          "hanya koordinator dasawisma dan anggota dasawisma yang boleh mengakses data pemasukan dasawisma",
      });
    }

    const data = (await pemasukanDasawismaRepo.getAllPemasukanDasawisma()).map(
      (item) => new PemasukanDasawismaModels(item),
    );
    if (data.length === 0) {
      return res.status(404).json({ message: "No pemasukan dasawisma found" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const getPemasukanDasawismaById = async (req, res) => {
  try {
    const roles = req.roles;
    if (!checkRoles(roles)) {
      return res.status(403).json({
        error:
          "hanya koordinator dasawisma dan anggota dasawisma yang boleh mengakses data pemasukan dasawisma",
      });
    }

    const id = req.params.id;
    const data = await pemasukanDasawismaRepo.getPemasukanDasawismaById(id);
    if (!data) {
      return res.status(404).json({ message: "Pemasukan dasawisma not found" });
    }
    res.status(200).json({ data: new PemasukanDasawismaModels(data) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const addPemasukanDasawisma = async (req, res) => {
  try {
    const roles = req.roles;
    if (!checkRoles(roles)) {
      return res.status(403).json({
        error:
          "hanya koordinator dasawisma dan anggota dasawisma yang boleh menambahkan data pemasukan dasawisma",
      });
    }

    const newPemasukanDasawisma = new PemasukanDasawismaModels({
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      sumber: req.body.sumber,
      tanggal_penghimpunan: req.body.tanggal_penghimpunan,
      anggota_dasawisma_id: req.body.anggota_dasawisma_id,
      created_at: new Date(),
    });

    const insertId = await pemasukanDasawismaRepo.createPemasukanDasawisma(
      newPemasukanDasawisma,
    );

    await totalKasDasawismaRepo.tambahTotalDasawisma(
      newPemasukanDasawisma.jumlah,
    );

    res.status(200).json({
      message: "Pemasukan dasawisma created",
      data: { ...newPemasukanDasawisma, id: insertId },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating data", error: error.message });
  }
};

const updatePemasukanDasawisma = async (req, res) => {
  try {
    const roles = req.roles;
    if (!checkRoles(roles)) {
      return res.status(403).json({
        error:
          "hanya koordinator dasawisma dan anggota dasawisma yang boleh mengupdate data pemasukan dasawisma",
      });
    }

    const id = req.params.id;
    const existingData =
      await pemasukanDasawismaRepo.getPemasukanDasawismaById(id);
    if (!existingData) {
      return res.status(404).json({ message: "Pemasukan dasawisma not found" });
    }

    const updatedPemasukanDasawisma = new PemasukanDasawismaModels({
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penghimpunan: req.body.tanggal_penghimpunan,
      dasawisma_id: req.body.dasawisma_id,
    });

    await pemasukanDasawismaRepo.updatePemasukanDasawisma(
      id,
      updatedPemasukanDasawisma,
    );
    res.status(200).json({
      message: "Pemasukan dasawisma updated",
      data: { ...updatedPemasukanDasawisma, id: id },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating data", error: error.message });
  }
};

module.exports = {
  getAllPemasukanDasawisma,
  getPemasukanDasawismaById,
  addPemasukanDasawisma,
  updatePemasukanDasawisma,
};
