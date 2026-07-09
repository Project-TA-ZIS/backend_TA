"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("koordinator123", 10);
    const now = new Date();

    await queryInterface.bulkInsert("anggota_dasawisma", [
      {
        rw_id: 1,
        nama_lengkap: "admin",
        email: "admin@dasawisma.com",
        password: hashedPassword,
        nomor_telpon: "081234567890",
        nik: "3201123456789001",
        roles: "penanggung jawab dasawisma",
        alamat: "Jl. Melati No. 12, Bandung",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("anggota_dasawisma", null, {});
  },
};
