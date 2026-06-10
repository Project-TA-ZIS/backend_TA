const conn = require("../../config/db_connection");
const pengeluaranDasawismaModel = require("../../models/transaksi/transaksi_dasawisma/pengeluaranDasawisma");

const getAllPengeluaranDasawisma = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM penyaluran_dasawisma WHERE deleted_status = 0",
  );
  return data;
};

const getPengeluaranDasawismaById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM penyaluran_dasawisma WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const addPengeluaranDasawisma = async (pengeluaranDasawisma) => {
  const [result] = await conn.execute(
    "INSERT INTO penyaluran_dasawisma (jumlah, deskripsi, tanggal_penyaluran, nama_anggota, created_at) VALUES (?, ?, ?, ?, ?)",
    [
      pengeluaranDasawisma.jumlah,
      pengeluaranDasawisma.deskripsi,
      pengeluaranDasawisma.tanggal_penyaluran,
      pengeluaranDasawisma.nama_anggota,
      new Date(),
    ],
  );
  return result.insertId;
};

const updatePengeluaranDasawisma = async (id, pengeluaranDasawisma) => {
  const [result] = await conn.execute(
    "UPDATE penyaluran_dasawisma SET jumlah = ?, deskripsi = ?, tanggal_penyaluran = ?, updated_at = ? WHERE id = ? AND deleted_status = 0",
    [
      pengeluaranDasawisma.jumlah,
      pengeluaranDasawisma.deskripsi,
      pengeluaranDasawisma.tanggal_penyaluran,
      new Date(),
      id,
    ],
  );
  return result;
};

module.exports = {
  getAllPengeluaranDasawisma,
  getPengeluaranDasawismaById,
  addPengeluaranDasawisma,
  updatePengeluaranDasawisma,
};
