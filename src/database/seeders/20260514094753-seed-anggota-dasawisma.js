"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("koordinator123", 10);

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
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("anggota_dasawisma", {
      email: "koordinator@dasawisma.com",
    });
  },
};
