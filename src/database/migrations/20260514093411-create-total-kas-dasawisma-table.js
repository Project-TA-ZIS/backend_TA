"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("total_kas_dasawisma", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      rw_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "rw",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      jumlah_keseluruhan: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },

      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("total_kas_dasawisma");
  },
};
