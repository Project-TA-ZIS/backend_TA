const conn = require("../../config/db_connection");
const pengeluaranZISModel = require("../../models/transaksi/transaksi_zis/penyaluranZIS.models");

const getAllPengeluaranZIS = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM penyaluran_zis WHERE deleted_status = 0",
  );
  return data;
};

const getPengeluaranZISById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM penyaluran_zis WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const addPengeluaranZIS = async (pengeluaranZIS) => {
  const [result] = await conn.execute(
    "INSERT INTO penyaluran_zis (mustahik_id, jumlah, kategori, deskripsi, tanggal_penyaluran, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [
      pengeluaranZIS.mustahik_id,
      pengeluaranZIS.jumlah,
      pengeluaranZIS.kategori,
      pengeluaranZIS.deskripsi,
      pengeluaranZIS.tanggal_penyaluran,
      new Date(),
    ],
  );

  return result.insertId;
};

const updatePengeluaranZIS = async (id, pengeluaranZIS) => {
  const [result] = await conn.execute(
    "UPDATE penyaluran_zis SET mustahik_id = ?, kategori = ?, jumlah = ?, deskripsi = ?, tanggal_penyaluran = ?, updated_at = ? WHERE id = ? AND deleted_status = 0",
    [
      pengeluaranZIS.mustahik_id,
      pengeluaranZIS.kategori,
      pengeluaranZIS.jumlah,
      pengeluaranZIS.deskripsi,
      pengeluaranZIS.tanggal_penyaluran,
      new Date(),
      id
    ],
  );
  return result;
};

const deletePengeluaranZIS = async (id) => {
  const [result] = await conn.execute(
    "UPDATE penyaluran_zis SET deleted_status = 1, deleted_at = ? WHERE id = ?",
    [new Date(), id],
  );
  return result;
};

module.exports = {
  getAllPengeluaranZIS,
  getPengeluaranZISById,
  addPengeluaranZIS,
  updatePengeluaranZIS,
  deletePengeluaranZIS,
};
