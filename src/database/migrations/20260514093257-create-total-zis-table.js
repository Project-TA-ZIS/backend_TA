"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("total_zis", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kategori: Sequelize.ENUM(
        "zakat maal",
        "infaq",
        "shodaqoh",
      ),
      jumlah_keseluruhan: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("total_zis");
  },
};
