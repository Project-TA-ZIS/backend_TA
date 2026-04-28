const conn = require("../../config/db_connection");
const PemasukanZIS = require("../../models/transaksi/transaksi_zis/pemasukanZIS.models");

const getAllPemasukanZIS = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM pemasukan_zis WHERE deleted_status = 0",
  );
  return data;
};

const getPemasukanZISById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM pemasukan_zis WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const addPemasukanZIS = async (pemasukanZIS) => {
    const { muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan } = pemasukanZIS;
    const [result] = await conn.execute(
        "INSERT INTO pemasukan_zis (muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        [muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan, new Date()]
    );
    return result.insertId;
};

const updatePemasukanZIS = async (id, pemasukanZIS) => {
    const { muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan } = pemasukanZIS;
    const [result] = await conn.execute(
        "UPDATE pemasukan_zis SET muzakki_id = ?, kategori = ?, jumlah = ?, deskripsi = ?, tanggal_penghimpunan = ?, updated_at = ? WHERE id = ? AND deleted_status = 0",
        [muzakki_id, kategori, jumlah, deskripsi, tanggal_penghimpunan, new Date(), id]
    );
    return result;
};

const deletePemasukanZIS = async (id) => {
    const [result] = await conn.execute(
        "UPDATE pemasukan_zis SET deleted_status = 1, deleted_at = ? WHERE id = ?",
        [new Date(), id]
    );
    return result;
};


module.exports = {  
    getAllPemasukanZIS,
    getPemasukanZISById,
    addPemasukanZIS,
    updatePemasukanZIS,
    deletePemasukanZIS,
};