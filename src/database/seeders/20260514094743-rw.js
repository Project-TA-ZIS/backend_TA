"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let i = 1; i <= 10; i++) {
      data.push({
        nama_rw: String(i).padStart(3, "0"),
        tipe_pengelolaan_kas: "RW",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      });
    }

    await queryInterface.bulkInsert("rw", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rw", null, {});
  },
};
