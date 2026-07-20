const pengeluaranDasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/penyaluranDasawisma.repo");
const totalDasawismaRepos = require("../../repositories/dasawisma_monitoring_repo/totalKasDasawisma.repo");
const penyaluranDasawismaModel = require("../../models/transaksi/transaksi_dasawisma/pengeluaranDasawisma");
const authController = require("../auth/auth.controller");
const { formatDateInput } = require("../../utils/formatDateInput");

const getAllPengeluaranDasawisma = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma" && role !== "kader dasawisma") {
      return res.status(403).json({
        error:
          "hanya koordinator dan kader dasawisma yang boleh mengakses data pengeluaran Dasawisma",
      });
    }

    const data = (
      await pengeluaranDasawismaRepo.getAllPengeluaranDasawisma()
    ).map((item) => new penyaluranDasawismaModel(item));

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran Dasawisma tidak ditemukan" });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPengeluaranDasawismaById = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma" && role !== "kader dasawisma") {
      return res.status(403).json({
        error:
          "hanya koordinator dan kader dasawisma yang boleh mengakses data pengeluaran Dasawisma",
      });
    }
    const { id } = req.params;
    const result =
      await pengeluaranDasawismaRepo.getPengeluaranDasawismaById(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran Dasawisma tidak ditemukan" });
    }

    res.status(200).json({ data: new penyaluranDasawismaModel(result) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPengeluaranDasawismaByRWid = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma" && role !== "kader dasawisma") {
      return res.status(403).json({
        error:
          "hanya koordinator dan kader dasawisma yang boleh mengakses data pengeluaran Dasawisma",
      });
    }
    const rw_id = req.rw;
    const data = (
      await pengeluaranDasawismaRepo.getPengeluaranDasawismaByRWid(rw_id)
    ).map((item) => new penyaluranDasawismaModel(item));

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran Dasawisma tidak ditemukan" });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validatePengeluaranDasawisma = (pengeluaranDasawisma) => {
  if (!pengeluaranDasawisma.deskripsi) {
    return { valid: false, message: "Deskripsi is required" };
  }

  if (!pengeluaranDasawisma.jumlah) {
    return { valid: false, message: "Jumlah is required" };
  }
  if (!pengeluaranDasawisma.tanggal_penyaluran) {
    return { valid: false, message: "Tanggal penyaluran is required" };
  }
  return { valid: true };
};

const addPengeluaranDasawisma = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma yang boleh menambahkan pengeluaran Dasawisma",
      });
    }

    const validation = validatePengeluaranDasawisma(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const penyaluranDasawisma = new penyaluranDasawismaModel({
      jumlah: req.body.jumlah,
      rw_id: req.rw,
      deskripsi: req.body.deskripsi,
      tanggal_penyaluran: req.body.tanggal_penyaluran,
      nama_anggota: req.body.nama_anggota,
    });

    const dateStatus = authController.validateDate(
      penyaluranDasawisma.tanggal_penyaluran,
    );

    if (!dateStatus) {
      return res.status(400).json({
        message: "Tanggal penyaluran harus sama dengan tanggal hari ini",
      });
    }

    // Kurangi saldo dulu agar tidak ada transaksi yang tersimpan saat saldo tidak cukup
    await totalDasawismaRepos.kurangiTotalDasawisma(
      penyaluranDasawisma.jumlah,
      req.rw,
    );

    let insertedId;
    try {
      insertedId =
        await pengeluaranDasawismaRepo.addPengeluaranDasawisma(
          penyaluranDasawisma,
        );
    } catch (e) {
      // rollback best-effort
      try {
        await totalDasawismaRepos.tambahTotalDasawisma(
          penyaluranDasawisma.jumlah,
          req.rw,
        );
      } catch (_) {
        // ignore
      }
      throw e;
    }

    res.status(200).json({
      message: "Pengeluaran Dasawisma berhasil ditambahkan",
      data: {
        ...penyaluranDasawisma,
        id: insertedId,
      },
    });
  } catch (error) {
    if (error?.code === "SALDO_TIDAK_CUKUP") {
      return res.status(400).json({
        message: error.message,
        kategori: error.kategori,
        saldo_tersedia: error.saldo_tersedia,
        perubahan_diminta: error.perubahan_diminta,
      });
    }

    res.status(500).json({ message: error.message });
  }
};

const updatePengeluaranDasawisma = async (req, res) => {
  try {
    const role = req.roles;
    if (role !== "penanggung jawab dasawisma") {
      return res.status(403).json({
        error:
          "hanya penanggung jawab dasawisma yang boleh mengubah data pengeluaran Dasawisma",
      });
    }
    const { id } = req.params;
    const existingData =
      await pengeluaranDasawismaRepo.getPengeluaranDasawismaById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ message: "Data pengeluaran Dasawisma tidak ditemukan" });
    }

    const tanggal_penyaluran = formatDateInput(req.body.tanggal_penyaluran);
    const newJumlah = Number(req.body.jumlah);
    const oldJumlah = Number(existingData.jumlah);

    const diff = newJumlah - oldJumlah;
    if (diff > 0) {
      // pengeluaran naik -> saldo turun
      await totalDasawismaRepos.kurangiTotalDasawisma(diff, req.rw);
    } else if (diff < 0) {
      // pengeluaran turun -> saldo naik
      await totalDasawismaRepos.tambahTotalDasawisma(Math.abs(diff), req.rw);
    }

    const newPengeluaranDasawisma = new penyaluranDasawismaModel({
      jumlah: req.body.jumlah,
      deskripsi: req.body.deskripsi,
      tanggal_penyaluran: tanggal_penyaluran,
      nama_anggota: req.body.nama_anggota,
      rw_id: req.rw,
    });

    const result = await pengeluaranDasawismaRepo.updatePengeluaranDasawisma(
      id,
      newPengeluaranDasawisma,
    );

    if (result.affectedRows === 0) {
      // rollback best-effort bila update transaksi gagal
      try {
        if (diff > 0) {
          await totalDasawismaRepos.tambahTotalDasawisma(diff, req.rw);
        } else if (diff < 0) {
          await totalDasawismaRepos.kurangiTotalDasawisma(
            Math.abs(diff),
            req.rw,
          );
        }
      } catch (_) {
        // ignore
      }

      return res.status(404).json({
        message:
          "Data pengeluaran Dasawisma tidak ditemukan atau tidak dapat diupdate",
      });
    }
    res
      .status(200)
      .json({ message: "Pengeluaran Dasawisma berhasil diupdate" });
  } catch (error) {
    if (error?.code === "SALDO_TIDAK_CUKUP") {
      return res.status(400).json({
        message: error.message,
        kategori: error.kategori,
        saldo_tersedia: error.saldo_tersedia,
        perubahan_diminta: error.perubahan_diminta,
      });
    }

    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPengeluaranDasawisma,
  getPengeluaranDasawismaById,
  addPengeluaranDasawisma,
  updatePengeluaranDasawisma,
  getPengeluaranDasawismaByRWid,
};
