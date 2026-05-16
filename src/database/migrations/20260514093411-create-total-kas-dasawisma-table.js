'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('total_kas_dasawisma', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      jumlah_keseluruhan: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('total_kas_dasawisma');
  },
};