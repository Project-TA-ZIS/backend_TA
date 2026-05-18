"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penyaluran_zis", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      mustahik_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "mustahik",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      kategori: Sequelize.ENUM(
        "zakat fitrah beras",
        "zakat fitrah uang",
        "zakat mal",
        "infaq",
        "shodaqoh",
      ),

      jumlah: Sequelize.DECIMAL(12, 2),

      deskripsi: Sequelize.TEXT,

      tanggal_penyaluran: Sequelize.DATEONLY,

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,

      deleted_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("penyaluran_zis");
  },
};
