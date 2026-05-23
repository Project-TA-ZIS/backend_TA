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
    "SELECT * FROM anggota_dasawisma WHERE id = ? AND deleted_status = 0",
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
    [nomor_telpon]
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

const createAnggotaDasawisma = async (anggotaData) => {
  const hashedPassword = await bcrypt.hash(anggotaData.password, 10);
  const [result] = await conn.execute(
    `INSERT INTO anggota_dasawisma 
    (nama_lengkap, email, password, nomor_telpon,tempat_lahir, tanggal_lahir, roles, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      anggotaData.nama_lengkap,
      anggotaData.email,
      hashedPassword,
      anggotaData.nomor_telpon,
      anggotaData.tempat_lahir,
      anggotaData.tanggal_lahir,
      anggotaData.roles,
      anggotaData.created_at,
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
  createAnggotaDasawisma,
  deleteAnggotaDasawisma,
  updateAnggotaDasawisma,
  updatePassword
};
