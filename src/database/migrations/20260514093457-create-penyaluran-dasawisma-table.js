"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penyaluran_dasawisma", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      jumlah: Sequelize.DECIMAL(12, 2),

      deskripsi: Sequelize.TEXT,

      tanggal_penyaluran: Sequelize.DATEONLY,
      
      nama_anggota: Sequelize.STRING(255),

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
    await queryInterface.dropTable("penyaluran_dasawisma");
  },
};
