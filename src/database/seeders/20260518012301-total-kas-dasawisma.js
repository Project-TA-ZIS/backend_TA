"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let rwId = 1; rwId <= 10; rwId++) {
      data.push({
        rw_id: rwId,
        jumlah_keseluruhan: 0,
        updated_at: null
      });
    }
    await queryInterface.bulkInsert("total_kas_dasawisma", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("total_kas_dasawisma", null, {});
  },
};
