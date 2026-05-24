const conn = require("../../config/db_connection");

const getAllPemasukanDasawisma = async () => {
  const [data] = await conn.execute("SELECT * FROM pemasukan_dasawisma WHERE deleted_status = 0");

  return data;
};

const getPemasukanDasawismaById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM pemasukan_dasawisma WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const createPemasukanDasawisma = async (pemasukanDasawisma) => {
  const [result] = await conn.execute(
    "INSERT INTO pemasukan_dasawisma (anggota_dasawisma_id, nama_anggota, sumber,  jumlah, deskripsi, tanggal_penghimpunan, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      pemasukanDasawisma.anggota_dasawisma_id,
      pemasukanDasawisma.nama_anggota,
      pemasukanDasawisma.sumber,
      pemasukanDasawisma.jumlah,
      pemasukanDasawisma.deskripsi,
      pemasukanDasawisma.tanggal_penghimpunan,
      pemasukanDasawisma.created_at,
    ],
  );
  return result.insertId;
};

const updatePemasukanDasawisma = async (id, pemasukanDasawisma) => {
  await conn.execute(
    "UPDATE pemasukan_dasawisma SET jumlah = ?, sumber = ?, deskripsi = ?, tanggal_penghimpunan = ?, anggota_dasawisma_id = ?, updated_at = ? WHERE id = ? AND deleted_status = 0",
    [
      pemasukanDasawisma.jumlah,
      pemasukanDasawisma.sumber,
      pemasukanDasawisma.deskripsi,
      pemasukanDasawisma.tanggal_penghimpunan,
      pemasukanDasawisma.anggota_dasawisma_id,
      new Date(),
      id,
    ],
  );
};

const deletePemasukanDasawisma = async (id) => {
  await conn.execute(
    "UPDATE pemasukan_dasawisma SET deleted_status = 1 WHERE id = ?",
    [id],
  );
};

module.exports = {
  getAllPemasukanDasawisma,
  getPemasukanDasawismaById,
  createPemasukanDasawisma,
  updatePemasukanDasawisma,
  deletePemasukanDasawisma,
};
