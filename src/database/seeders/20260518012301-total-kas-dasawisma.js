"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let rwId = 1; rwId <= 10; rwId++) {
      let total = 0;

      if (rwId === 1) total = 275000;
      if (rwId === 2) total = 250000;

      data.push({
        rw_id: rwId,
        jumlah_keseluruhan: total,
        updated_at: null,
      });
    }

    await queryInterface.bulkInsert("total_kas_dasawisma", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_kas_dasawisma", null, {});
  },
};
