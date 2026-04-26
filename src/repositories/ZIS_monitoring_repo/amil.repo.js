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
  const amil = new amilModel({
    ...amilData,
    password: hashedPassword,
  });
  const query = `
        INSERT INTO amil 
        (
            nama_lengkap,   
            email,
            nomor_telpon,
            alamat,
            password,
            roless,
            created_at,
            updated_at,
            deleted_at,
            deleted_status
        )   
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    amil.nama_lengkap,
    amil.email,
    amil.nomor_telpon,
    amil.alamat,
    amil.password,
    amil.roless,
    amil.created_at,
    amil.updated_at,
    amil.deleted_at,
    amil.deleted_status,
  ];

  const [result] = await conn.execute(query, values);
  return {  ...amilData};
};

const deleteAmil = async (id) => {
  const query = `
    UPDATE amil
    SET deleted_status = 1, deleted_at = NOW()
    WHERE id = ? AND deleted_status = 0
  `;
  const [result] = await conn.execute(query, [id]);
  return result.affectedRows > 0;
}


module.exports = {
  getAllAmil,
  getAmilById,
  getAmilByEmail,
  createAmil,
  deleteAmil,
};
