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

const createAnggotaDasawisma = async (anggotaData) => {
  const hashedPassword = await bcrypt.hash(anggotaData.password, 10);
  const anggota = new DasawismaModel({
    ...anggotaData,
    password: hashedPassword,
  });
  const query = `
    INSERT INTO anggota_dasawisma 
    (
      nama_lengkap,
      email,
      nomor_telpon,
      alamat,
      password,
      nik,
      roles,
      tempat_lahir,
      tanggal_lahir,
      created_at,
      updated_at,
      deleted_at,
      deleted_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    anggota.nama_lengkap,
    anggota.email,
    anggota.nomor_telpon,
    anggota.alamat,
    anggota.password,
    anggota.nik,
    anggota.roles,
    anggota.tempat_lahir,
    anggota.tanggal_lahir,
    anggota.created_at,
    anggota.updated_at,
    anggota.deleted_at,
    anggota.deleted_status,
  ];

  const [result] = await conn.execute(query, values);

  return {
    ...anggota,
  };
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

module.exports = {
  getAllAnggotaDasawisma,
  getAnggotaDasawismaById,
  getAnggotaDasawismaByEmail,
  createAnggotaDasawisma,
  deleteAnggotaDasawisma,
};
