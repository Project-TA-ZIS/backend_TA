"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("total_zis", [
      {
        kategori: "zakat fitrah",
        jumlah_keseluruhan: 0,
        updated_at: null,
      },
      {
        kategori: "zakat mal",
        jumlah_keseluruhan: 0,
        updated_at: null,
      },
      {
        kategori: "shodaqoh",
        jumlah_keseluruhan: 0,
        updated_at: null,
      },
      {
        kategori: "infaq",
        jumlah_keseluruhan: 0,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_zis", null, {});
  },
};
