"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("amil123", 10);
    const now = new Date();

    await queryInterface.bulkInsert("amil", [
      {
        nama_lengkap: "Ridwan Hakim",
        email: "ridwan.hakim@amil.test",
        password,
        nomor_telpon: "083812345001",
        alamat: "Jl. Cipaganti No. 17, Bandung",
        roles: "amil zakat",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "Farhan Maulana",
        email: "farhan.maulana@amil.test",
        password,
        nomor_telpon: "083812345002",
        alamat: "Jl. Gegerkalong No. 9, Bandung",
        roles: "amil zakat",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "Zahra Nabila",
        email: "zahra.nabila@amil.test",
        password,
        nomor_telpon: "083812345003",
        alamat: "Jl. Antapani No. 26, Bandung",
        roles: "amil zakat",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("amil", null, {});
  },
};
