"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pemasukan_dasawisma", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      anggota_dasawisma_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "anggota_dasawisma",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      jumlah: Sequelize.DECIMAL(12, 2),

      deskripsi: Sequelize.TEXT,

      tanggal_penghimpunan: Sequelize.DATEONLY,

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
    await queryInterface.dropTable("pemasukan_dasawisma");
  },
};
