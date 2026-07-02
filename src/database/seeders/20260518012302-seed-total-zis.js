"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("total_zis", [
      {
        kategori: "zakat fitrah beras",
        jumlah_keseluruhan: 20,
        updated_at: now,
      },
      {
        kategori: "zakat fitrah uang",
        jumlah_keseluruhan: 600000,
        updated_at: now,
      },
      {
        kategori: "zakat mal",
        jumlah_keseluruhan: 2750000,
        updated_at: now,
      },
      {
        kategori: "shodaqoh",
        jumlah_keseluruhan: 350000,
        updated_at: now,
      },
      {
        kategori: "infaq",
        jumlah_keseluruhan: 600000,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_zis", null, {});
  },
};
