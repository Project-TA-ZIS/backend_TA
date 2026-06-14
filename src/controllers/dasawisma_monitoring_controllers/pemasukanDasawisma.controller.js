const pemasukanDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/pemasukanDasawisma.repo");
const PemasukanDasawismaModels = require("../../models/transaksi/transaksi_dasawisma/pemasukanDasawisma");
const totalKasDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");
const anggotaDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const authController = require("../auth/auth.controller");

const checkRoles = (roles) => {
  if (roles != "penanggung jawab dasawisma" && roles != "kader dasawisma") {
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
          "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh mengakses data pemasukan dasawisma",
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
          "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh mengakses data pemasukan dasawisma",
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

const validatePemasukanDasawisma = (pemasukanDasawisma) => {
  if (!pemasukanDasawisma.sumber) {
    return { valid: false, message: "Sumber is required" };
  }

  if (!pemasukanDasawisma.deskripsi) {
    return { valid: false, message: "Deskripsi is required" };
  }

  if (!pemasukanDasawisma.jumlah) {
    return { valid: false, message: "Jumlah is required" };
  }
  if (!pemasukanDasawisma.tanggal_penghimpunan) {
    return { valid: false, message: "Tanggal penghimpunan is required" };
  }
  return { valid: true };
};

const addPemasukanDasawisma = async (req, res) => {
  try {
    const roles = req.roles;
    let existingAnggota = null;
    if (!checkRoles(roles)) {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh menambahkan data pemasukan dasawisma",
      });
    }

    if (req.body.anggota_dasawisma_id) {
      existingAnggota = await anggotaDasawismaRepo.getAnggotaDasawismaById(
        req.body.anggota_dasawisma_id,
      );
      if (!existingAnggota) {
        return res.status(404).json({ message: "Anggota dasawisma not found" });
      }
    }

    const validation = validatePemasukanDasawisma(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const newPemasukanDasawisma = new PemasukanDasawismaModels({
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      sumber: req.body.sumber,
      nama_anggota: existingAnggota ? existingAnggota.nama_lengkap : null,
      tanggal_penghimpunan: req.body.tanggal_penghimpunan,
      anggota_dasawisma_id: req.body.anggota_dasawisma_id,
      created_at: new Date(),
    });

    const isValidDate = authController.validateDate(
      newPemasukanDasawisma.tanggal_penghimpunan,
    );

    if (!isValidDate) {
      return res.status(400).json({
        message: "Tanggal penghimpunan tidak boleh melebihi tanggal saat ini",
      });
    }

    const insertId = await pemasukanDasawismaRepo.createPemasukanDasawisma(
      newPemasukanDasawisma,
    );

    await totalKasDasawismaRepo.tambahTotalDasawisma(
      newPemasukanDasawisma.jumlah,
    );

    console.log(
      "New pemasukan dasawisma added with ID:",
      newPemasukanDasawisma,
    );

    res.status(200).json({
      message: "Pemasukan dasawisma created",
      data: { ...newPemasukanDasawisma, id: insertId },
      // data: { ...newPemasukanDasawisma},
    });
  } catch (error) {
    console.error("Error in addPemasukanDasawisma:", error);
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
          "hanya penanggung jawab dasawisma dan kader dasawisma yang boleh mengupdate data pemasukan dasawisma",
      });
    }

    const { id } = req.params;

    const existingData =
      await pemasukanDasawismaRepo.getPemasukanDasawismaById(id);

    if (!existingData) {
      return res.status(404).json({
        message: "Pemasukan dasawisma not found",
      });
    }

    // let existingAnggota = null;
    // let anggotaDasawismaId = null;
    // if (req.body.sumber === "IURAN" && req.body.anggota_dasawisma_id) {
    //   existingAnggota = await anggotaDasawismaRepo.getAnggotaDasawismaById(
    //     req.body.anggota_dasawisma_id,
    //   );
    //   if (!existingAnggota) {
    //     return res.status(404).json({ message: "Anggota dasawisma not found" });
    //   }
    //   anggotaDasawismaId = req.body.anggota_dasawisma_id;
    // } else if (req.body.sumber === "IURAN" && !req.body.anggota_dasawisma_id) {
    //   return res.status(400).json({
    //     message: "Anggota dasawisma ID is required when sumber is IURAN",
    //   });
    // }

    const validation = validatePemasukanDasawisma(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    // VALIDASI TANGGAL
    const dateStatus = authController.validateDate(
      req.body.tanggal_penghimpunan,
    );

    if (!dateStatus) {
      return res.status(400).json({
        message: "Tanggal penghimpunan tidak boleh melebihi tanggal saat ini",
      });
    }

    const tanggalPenghimpunan = new Date(req.body.tanggal_penghimpunan)
      .toISOString()
      .split("T")[0];

    const newJumlah = Number(req.body.jumlah);
    const oldJumlah = Number(existingData.jumlah);

    if (newJumlah !== oldJumlah) {
      const jumlahDifference = newJumlah - oldJumlah;

      if (jumlahDifference > 0) {
        await totalKasDasawismaRepo.tambahTotalDasawisma(jumlahDifference);
      } else {
        await totalKasDasawismaRepo.kurangiTotalDasawisma(
          Math.abs(jumlahDifference),
        );
      }
    }

    const updatedPemasukanDasawisma = new PemasukanDasawismaModels({
      jumlah: newJumlah,
      sumber: req.body.sumber,
      deskripsi: req.body.deskripsi,
      tanggal_penghimpunan: tanggalPenghimpunan,
      anggota_dasawisma_id: req.body.anggota_dasawisma_id ? req.body.anggota_dasawisma_id : null,
      nama_anggota: req.body.nama_anggota ? req.body.nama_anggota : existingData.nama_anggota,
    });

    await pemasukanDasawismaRepo.updatePemasukanDasawisma(
      id,
      updatedPemasukanDasawisma,
    );

    return res.status(200).json({
      message: "Pemasukan dasawisma updated",
      data: {
        ...updatedPemasukanDasawisma,
        id,
      },
    });
  } catch (error) {
    console.error("Error in updatePemasukanDasawisma:", error);

    if (error?.code === "SALDO_TIDAK_CUKUP") {
      return res.status(400).json({
        message: error.message,
        kategori: error.kategori,
        saldo_tersedia: error.saldo_tersedia,
        perubahan_diminta: error.perubahan_diminta,
      });
    }

    return res.status(500).json({
      message: "Error updating data",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPemasukanDasawisma,
  getPemasukanDasawismaById,
  addPemasukanDasawisma,
  updatePemasukanDasawisma,
};
