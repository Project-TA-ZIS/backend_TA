const conn = require("../../config/db_connection");

const getAllRW = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM rw WHERE deleted_status = 0",
  );
  return data;
};

const getRWById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM rw WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const createRW = async (rwData) => {
  const [result] = await conn.execute(
    "INSERT INTO rw (nama_rw, created_at, updated_at, deleted_at, deleted_status) VALUES (?, ?, ?, ?, ?)",
    [rwData.nama_rw, new Date(), new Date(), null, 0],
  );
  return result.insertId;
};

const deleteRW = async (id) => {
  const [result] = await conn.execute(
    "UPDATE rw SET deleted_status = 1, deleted_at = ? WHERE id = ?",
    [new Date(), id],
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllRW,
  getRWById,
  createRW,
  deleteRW,
};
