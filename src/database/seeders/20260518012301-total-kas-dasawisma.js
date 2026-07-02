"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const saldoPerRw = {
      1: 85000,
      2: 85000,
      3: 100000,
      4: 75000,
      5: 125000,
      6: 50000,
    };

    const data = Array.from({ length: 10 }, (_, index) => {
      const rwId = index + 1;

      return {
        rw_id: rwId,
        jumlah_keseluruhan: saldoPerRw[rwId] ?? 0,
        updated_at: now,
      };
    });

    await queryInterface.bulkInsert("total_kas_dasawisma", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_kas_dasawisma", null, {});
  },
};
