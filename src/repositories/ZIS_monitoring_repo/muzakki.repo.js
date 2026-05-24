const conn = require("../../config/db_connection");
const bcrypt = require("bcrypt");
const muzakkiModel = require("../../models/users/muzakki/muzakki.models");

const getAllMuzakki = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM muzakki WHERE deleted_status = 0",
  );
  return data;
};
const getMuzakkiById = async (id) => {
  const [data] = await conn.execute(
    "SELECT * FROM muzakki WHERE id = ? AND deleted_status = 0",
    [id],
  );
  return data[0];
};

const getMuzakkiByNik = async (nik) => {
  const [data] = await conn.execute(
    "SELECT * FROM muzakki WHERE nik = ? AND deleted_status = 0",
    [nik],
  );
  return data[0];
};

const getMuzakkiByEmail = async (email) => {
  const [data] = await conn.execute(
    "SELECT * FROM muzakki WHERE email = ? AND deleted_status = 0",
    [email],
  );
  return data[0];
};

const getMuzakkiByNomorTelpon = async (nomor_telpon) => {
  const [data] = await conn.execute(
    "SELECT * FROM muzakki WHERE nomor_telpon = ? AND deleted_status = 0",
    [nomor_telpon],
  );
  return data[0];
};

const createMuzakki = async (muzakkiData) => {
  const query = `

        INSERT INTO muzakki
        (
            nama_lengkap,
            email,
            nomor_telpon,
            alamat,
            npwp,
            nik,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            pekerjaan,
            created_at,
            updated_at,
            deleted_at,
            deleted_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const [result] = await conn.execute(query, [
    muzakkiData.nama_lengkap,
    muzakkiData.email,
    muzakkiData.nomor_telpon,
    muzakkiData.alamat,
    muzakkiData.npwp,
    muzakkiData.nik,
    muzakkiData.tempat_lahir,
    muzakkiData.tanggal_lahir,
    muzakkiData.jenis_kelamin,
    muzakkiData.pekerjaan,
    muzakkiData.created_at,
    muzakkiData.updated_at,
    muzakkiData.deleted_at,
    muzakkiData.deleted_status,
  ]);
  return result.insertId;
};

const deleteMuzakki = async (id) => {
  const query = `
        UPDATE muzakki  
        SET deleted_status = 1, deleted_at = NOW()
        WHERE id = ?
    `;
  const [result] = await conn.execute(query, [id]);
  return result.affectedRows > 0;
};

const editMuzakki = async (id, muzakkiData) => {
  const query = `
        UPDATE muzakki
        SET
            nama_lengkap = ?,
            email = ?,
            nomor_telpon = ?,
            alamat = ?,
            npwp = ?,
            nik = ?,
            tempat_lahir = ?,
            tanggal_lahir = ?,
            jenis_kelamin = ?,
            pekerjaan = ?,
            updated_at = ?
        WHERE id = ? AND deleted_status = 0
    `;
  const [result] = await conn.execute(query, [
    muzakkiData.nama_lengkap,
    muzakkiData.email,
    muzakkiData.nomor_telpon,
    muzakkiData.alamat,
    muzakkiData.npwp,
    muzakkiData.nik,
    muzakkiData.tempat_lahir,
    muzakkiData.tanggal_lahir,
    muzakkiData.jenis_kelamin,
    muzakkiData.pekerjaan,
    muzakkiData.updated_at,
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllMuzakki,
  getMuzakkiById,
  createMuzakki,
  deleteMuzakki,
  getMuzakkiByNik,
  getMuzakkiByEmail,
  getMuzakkiByNomorTelpon,
  editMuzakki,
};
