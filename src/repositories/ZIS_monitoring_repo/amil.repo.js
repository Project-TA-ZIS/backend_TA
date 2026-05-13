const conn = require("../../config/db_connection");
const bcrypt = require("bcrypt");
const amilModel = require("../../models/users/amil/amil.models");

const getAllAmil = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM amil WHERE deleted_status = 0",
  );
  return data;
};

const getAmilById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM amil WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const getAmilByEmail = async (email) => {
  const [data] = await conn.execute(
    "SELECT * FROM amil WHERE email = ? AND deleted_status = 0",
    [email],
  );
  return data[0];
};

const createAmil = async (amilData) => {
  const hashedPassword = await bcrypt.hash(amilData.password, 10);
  const [result] = await conn.execute(
    "INSERT INTO amil (nama_lengkap, email, nomor_telpon, alamat, password, roles, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      amilData.nama_lengkap,
      amilData.email,
      amilData.nomor_telpon,
      amilData.alamat,
      hashedPassword,
      amilData.roles,
      amilData.created_at,
    ],
  );
  return result.insertId;
};

const deleteAmil = async (id) => {
  const query = `
    UPDATE amil
    SET deleted_status = 1, deleted_at = NOW()
    WHERE id = ? AND deleted_status = 0
  `;
  const [result] = await conn.execute(query, [id]);
  return result.affectedRows > 0;
};

const updateAmil = async (id, amilData) => {
  const query = `
    UPDATE amil
    SET nama_lengkap = ?, email = ?, nomor_telpon = ?, alamat = ?,  roles = ?, updated_at = NOW()
    WHERE id = ? AND deleted_status = 0
  `;
  const [result] = await conn.execute(query, [
    amilData.nama_lengkap,
    amilData.email,
    amilData.nomor_telpon,
    amilData.alamat,
    amilData.roles,
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllAmil,
  getAmilById,
  getAmilByEmail,
  createAmil,
  deleteAmil,
  updateAmil
};
