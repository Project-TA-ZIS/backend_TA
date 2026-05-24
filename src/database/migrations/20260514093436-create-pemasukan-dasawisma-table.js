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
        allowNull: true,
        references: {
          model: "anggota_dasawisma",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      nama_anggota: Sequelize.STRING(255),

      sumber: {
        type: Sequelize.ENUM("IURAN", "LAINNYA"),
        allowNull: false,
        defaultValue: "IURAN",
      },

      jumlah: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      tanggal_penghimpunan: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

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
