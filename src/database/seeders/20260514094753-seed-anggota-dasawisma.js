"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("koordinator123", 10);
    const anggota1 = await bcrypt.hash("anggota123", 10);
    const anggota2 = await bcrypt.hash("anggota456", 10);
    const anggota3 = await bcrypt.hash("anggota789", 10);
    const anggota4 = await bcrypt.hash("anggota12sas3", 10);
    const anggota5 = await bcrypt.hash("anggota1sas23", 10);

    await queryInterface.bulkInsert("anggota_dasawisma", [
      {
        nama_lengkap: "Koordinator Dasawisma",
        email: "koordinator@dasawisma.com",
        password: hashedPassword,
        nomor_telpon: "081234567890",
        nik: "3201123456789001",
        roles: "koordinator dasawisma",
        alamat: "Bandung, Jawa Barat",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "anggota1",
        email: "anggota1@dasawisma.com",
        password: anggota1,
        nomor_telpon: "081234567891",
        nik: "3201123456789002",
        roles: "anggota dasawisma",
        alamat: "Bandung, Jawa Barat",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "anggota2",
        email: "anggota2@dasawisma.com",
        password: anggota2,
        nomor_telpon: "081234567892",
        nik: "3201123456789003",
        roles: "anggota dasawisma",
        alamat: "Bandung, Jawa Barat",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "anggota3",
        email: "anggota3@dasawisma.com",
        password: anggota3,
        nomor_telpon: "081234567893",
        nik: "3201123456789004",
        roles: "anggota dasawisma",
        alamat: "Bandung, Jawa Barat",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "anggota4",
        email: "anggota4@dasawisma.com",
        password: anggota4,
        nomor_telpon: "081234567894",
        nik: "3201123456789005",
        roles: "anggota dasawisma",
        alamat: "Bandung, Jawa Barat",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "anggota5",
        email: "anggota5@dasawisma.com",
        password: anggota5,
        nomor_telpon: "081234567895",
        nik: "3201123456789006",
        roles: "anggota dasawisma",
        alamat: "Bandung, Jawa Barat",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("anggota_dasawisma", {
      email: "koordinator@dasawisma.com",
    });
  },
};
