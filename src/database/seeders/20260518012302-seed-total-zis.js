"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("total_zis", [
      {
        kategori: "zakat maal",
        jumlah_keseluruhan: 5150000,
        updated_at: null,
      },
      {
        kategori: "shodaqoh",
        jumlah_keseluruhan: 50000,
        updated_at: null,
      },
      {
        kategori: "infaq",
        jumlah_keseluruhan: 400000,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_zis", null, {});
  },
};
