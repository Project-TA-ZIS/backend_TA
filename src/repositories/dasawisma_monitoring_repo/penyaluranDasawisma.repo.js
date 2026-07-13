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

const getPengeluaranDasawismaByRWid = async (rw_id) => {
  const [data] = await conn.execute(
    "SELECT * FROM penyaluran_dasawisma WHERE rw_id = ? AND deleted_status = 0",
    [rw_id],
  );
  return data;
};

const addPengeluaranDasawisma = async (pengeluaranDasawisma) => {
  const [result] = await conn.execute(
    "INSERT INTO penyaluran_dasawisma (rw_id, jumlah, deskripsi, tanggal_penyaluran, nama_anggota, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [
      pengeluaranDasawisma.rw_id,
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
    "UPDATE penyaluran_dasawisma SET rw_id = ?, jumlah = ?, deskripsi = ?, tanggal_penyaluran = ?, updated_at = ? WHERE id = ? AND deleted_status = 0",
    [
      pengeluaranDasawisma.rw_id,
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
  getPengeluaranDasawismaByRWid,
  addPengeluaranDasawisma,
  updatePengeluaranDasawisma,
};
