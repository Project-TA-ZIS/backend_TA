const conn = require("../../config/db_connection");
const bcrypt = require("bcrypt");
const mustahikModel = require("../../models/mustahik/mustahik.models");

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

const createMustahik = async (mustahikData) => {
  const mustahik = new mustahikModel({
    ...mustahikData,
  });
  const query = `
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
    `;
  const [result] = await conn.execute(query, [
    mustahik.nama_lengkap,
    mustahik.nomor_telpon,
    mustahik.alamat,
    mustahik.nik,
    mustahik.tempat_lahir,
    mustahik.tanggal_lahir,
    mustahik.jenis_kelamin,
    mustahik.kategori,
    mustahik.created_at,
    mustahik.updated_at,
    mustahik.deleted_at,
    mustahik.deleted_status,
  ]);
  return { id: result.insertId, ...mustahikData };
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
  const mustahik = new mustahikModel({
    ...mustahikData,
  });
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
    mustahik.nama_lengkap,
    mustahik.nomor_telpon,
    mustahik.alamat,
    mustahik.nik,
    mustahik.tempat_lahir,
    mustahik.tanggal_lahir,
    mustahik.jenis_kelamin,
    mustahik.kategori,
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllMustahik,
  getMustahikById,
  createMustahik,
  deleteMustahik,
  getMustahikByNik,
  editMustahik,
};
