"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("total_kas_dasawisma", [
      {
        jumlah_keseluruhan: 0,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_kas_dasawisma", null, {});
  },
};
