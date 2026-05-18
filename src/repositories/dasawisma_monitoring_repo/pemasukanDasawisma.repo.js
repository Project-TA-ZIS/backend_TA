const conn = require("../../config/db_connection");

const getAllPemasukanDasawisma = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM pemasukan_dasawisma WHERE deleted_status = 0",
  );
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
    "INSERT INTO pemasukan_dasawisma (anggota_dasawisma_id, jumlah, deskripsi, tanggal_penghimpunan, created_at) VALUES (?, ?, ?, ?, ?)",
    [
      pemasukanDasawisma.anggota_dasawisma_id,
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
    "UPDATE pemasukan_dasawisma SET jumlah = ?, deskripsi = ?, tanggal_penghimpunan = ?, dasawisma_id = ? WHERE id = ? AND deleted_status = 0",
    [
      pemasukanDasawisma.jumlah,
      pemasukanDasawisma.deskripsi,
      pemasukanDasawisma.tanggal_penghimpunan,
      pemasukanDasawisma.dasawisma_id,
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
