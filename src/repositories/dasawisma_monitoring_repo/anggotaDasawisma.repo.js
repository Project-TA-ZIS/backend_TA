const conn = require("../../config/db_connection");
const bcrypt = require("bcrypt");
const DasawismaModel = require("../../models/users/dasawisma/dasawisma.models");

const getAllAnggotaDasawisma = async () => {
  const [data] = await conn.execute(
    "SELECT * FROM anggota_dasawisma WHERE deleted_status = 0",
  );
  return data;
};

const getAnggotaDasawismaById = async (id) => {
  const [data] = await conn.execute(
    `
    SELECT
      ad.*,
      rw.nama_rw
    FROM anggota_dasawisma ad
    JOIN rw ON ad.rw_id = rw.id
    WHERE ad.id = ?
      AND ad.deleted_status = 0
    `,
    [id],
  );
  return data[0];
};

const getAnggotaDasawismaByEmail = async (email) => {
  const [data] = await conn.execute(
    "SELECT * FROM anggota_dasawisma WHERE email = ? AND deleted_status = 0",
    [email],
  );
  return data[0];
};

const getAnggotaDasawismaByPhone = async (nomor_telpon) => {
  const [data] = await conn.execute(
    "SELECT * FROM anggota_dasawisma WHERE nomor_telpon = ? AND deleted_status = 0",
    [nomor_telpon],
  );

  return data[0];
};

const getAnggotaDasawismaByNik = async (nik) => {
  const [data] = await conn.execute(
    "SELECT * FROM anggota_dasawisma WHERE nik = ? AND deleted_status = 0",
    [nik],
  );
  return data[0];
};

const getAnggotaDasawismaByRWid = async (rw_id) => {
  const [data] = await conn.execute(
    `
    SELECT
      ad.*,
      rw.nama_rw
    FROM anggota_dasawisma ad
    JOIN rw ON ad.rw_id = rw.id
    WHERE ad.rw_id = ?
      AND ad.deleted_status = 0
    `,
    [rw_id],
  );

  return data;
};

const getPenanggungJawabByRWid = async (rw_id) => {
  const [data] = await conn.execute(
     `
    SELECT
      ad.*,
      rw.nama_rw
    FROM anggota_dasawisma ad
    JOIN rw ON ad.rw_id = rw.id
    WHERE ad.rw_id = ?
      AND ad.roles = 'penanggung jawab dasawisma'
      AND ad.deleted_status = 0
    `,
    [rw_id],
  );
  return data[0];
};

const createAnggotaDasawisma = async (anggotaData) => {
  const hashedPassword = await bcrypt.hash(anggotaData.password, 10);
  const [result] = await conn.execute(
    `INSERT INTO anggota_dasawisma 
    (rw_id, nama_lengkap, email, password, nomor_telpon,tempat_lahir, tanggal_lahir, roles, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      anggotaData.rw_id,
      anggotaData.nama_lengkap,
      anggotaData.email,
      hashedPassword,
      anggotaData.nomor_telpon,
      anggotaData.tempat_lahir,
      anggotaData.tanggal_lahir,
      anggotaData.roles,
      new Date(),
    ],
  );

  return result.insertId;
};

const deleteAnggotaDasawisma = async (id) => {
  const deleted_at = new Date();
  const deleted_status = 1;
  const query = `
    UPDATE anggota_dasawisma
    SET deleted_at = ?, deleted_status = ?
    WHERE id = ? AND deleted_status = 0
  `;

  const values = [deleted_at, deleted_status, id];

  const [result] = await conn.execute(query, values);

  return result.affectedRows > 0;
};

const updateAnggotaDasawisma = async (id, anggotaData) => {
  const [result] = await conn.execute(
    `UPDATE anggota_dasawisma
    SET nama_lengkap = ?, email = ?, nomor_telpon = ?, alamat = ?, nik = ?, tempat_lahir = ?, tanggal_lahir = ?, roles = ?, updated_at = ?
    WHERE id = ? AND deleted_status = 0`,
    [
      anggotaData.nama_lengkap,
      anggotaData.email,
      anggotaData.nomor_telpon,
      anggotaData.alamat,
      anggotaData.nik,
      anggotaData.tempat_lahir,
      anggotaData.tanggal_lahir,
      anggotaData.roles,
      new Date(),
      id,
    ],
  );

  return result.affectedRows > 0;
};

const updateAnggotaByPJ = async (id, anggotaData) => {
  const [result] = await conn.execute(
    `UPDATE anggota_dasawisma
    SET rw_id = ?, nama_lengkap = ?, email = ?, nomor_telpon = ?, roles = ?, updated_at = ?
    WHERE id = ? AND deleted_status = 0`,
    [
      anggotaData.rw_id,
      anggotaData.nama_lengkap,
      anggotaData.email,
      anggotaData.nomor_telpon,
      anggotaData.roles,
      new Date(),
      id,
    ],
  );

  return result.affectedRows > 0;
};

const updatePassword = async (id, newPassword) => {
  const [result] = await conn.execute(
    `UPDATE anggota_dasawisma
    SET password = ?, updated_at = ?
    WHERE id = ? AND deleted_status = 0`,
    [newPassword, new Date(), id],
  );

  return result.affectedRows > 0;
};

module.exports = {
  getAllAnggotaDasawisma,
  getAnggotaDasawismaById,
  getAnggotaDasawismaByEmail,
  getAnggotaDasawismaByNik,
  getAnggotaDasawismaByPhone,
  getAnggotaDasawismaByRWid,
  getPenanggungJawabByRWid,
  createAnggotaDasawisma,
  deleteAnggotaDasawisma,
  updateAnggotaDasawisma,
  updateAnggotaByPJ,
  updatePassword,
};
