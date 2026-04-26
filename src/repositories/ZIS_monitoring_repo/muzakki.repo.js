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

const createMuzakki = async (muzakkiData) => {
  const muzakki = new muzakkiModel({
    ...muzakkiData,
  });
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
    muzakki.nama_lengkap,
    muzakki.email,
    muzakki.nomor_telpon,
    muzakki.alamat,
    muzakki.npwp,
    muzakki.nik,
    muzakki.tempat_lahir,
    muzakki.tanggal_lahir,
    muzakki.jenis_kelamin,
    muzakki.pekerjaan,
    muzakki.created_at,
    muzakki.updated_at,
    muzakki.deleted_at,
    muzakki.deleted_status,
    
  ]);
  return {id: result.insertId, ...muzakkiData};
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

module.exports = {
  getAllMuzakki,
  getMuzakkiById,
  createMuzakki,
  deleteMuzakki,
  getMuzakkiByNik,
};
