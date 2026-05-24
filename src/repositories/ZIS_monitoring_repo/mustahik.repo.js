const conn = require("../../config/db_connection");
const bcrypt = require("bcrypt");
const mustahikModel = require("../../models/users/mustahik/mustahik.models");

const getAllMustahik = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM mustahik WHERE deleted_status = 0",
  );
  return data;
};

const getMustahikById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM mustahik WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const getMustahikByNik = async (nik) => {
  const [data] = await conn.execute(
    "SELECT * FROM mustahik WHERE nik = ? AND deleted_status = 0",
    [nik],
  );
  return data[0];
};

const getMustahikByPhone = async (phone) => {
  const [data] = await conn.execute(
    "SELECT * FROM mustahik WHERE nomor_telpon = ? AND deleted_status = 0",
    [phone],
  );
  return data[0];
};

const createMustahik = async (mustahikData) => {
  const [result] = await conn.execute(
    `
      INSERT INTO mustahik 
      (
          nama_lengkap,
          nomor_telpon,
          alamat,
          nik,
          tempat_lahir,
          tanggal_lahir,
          jenis_kelamin,
          kategori,
          created_at,
          updated_at,
          deleted_at,
          deleted_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      mustahikData.nama_lengkap,
      mustahikData.nomor_telpon,
      mustahikData.alamat,
      mustahikData.nik,
      mustahikData.tempat_lahir,
      mustahikData.tanggal_lahir,
      mustahikData.jenis_kelamin,
      mustahikData.kategori,
      mustahikData.created_at,
      mustahikData.updated_at,
      mustahikData.deleted_at,
      mustahikData.deleted_status,
    ],
  );

  return result.insertId;
};

const deleteMustahik = async (id) => {
  const query = `

        UPDATE mustahik
        SET deleted_status = 1, deleted_at = NOW()
        WHERE id = ? AND deleted_status = 0
    `;
  const [result] = await conn.execute(query, [id]);
  return result.affectedRows > 0;
};

const editMustahik = async (id, mustahikData) => {
  const query = `

        UPDATE mustahik
        SET 
            nama_lengkap = ?,
            nomor_telpon = ?,
            alamat = ?,
            nik = ?,
            tempat_lahir = ?,
            tanggal_lahir = ?,
            jenis_kelamin = ?,
            kategori = ?,
            updated_at = NOW()
        WHERE id = ? AND deleted_status = 0
    `;
  const [result] = await conn.execute(query, [
    mustahikData.nama_lengkap,
    mustahikData.nomor_telpon,
    mustahikData.alamat,
    mustahikData.nik,
    mustahikData.tempat_lahir,
    mustahikData.tanggal_lahir,
    mustahikData.jenis_kelamin,
    mustahikData.kategori,
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllMustahik,
  getMustahikById,
  getMustahikByPhone,
  createMustahik,
  deleteMustahik,
  getMustahikByNik,
  editMustahik,
};
