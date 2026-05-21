'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('amil', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_lengkap: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
      },
      password: Sequelize.STRING,
      nomor_telpon: Sequelize.STRING,
      alamat: Sequelize.STRING,
      roles: Sequelize.ENUM('amil zakat'),
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
    await queryInterface.dropTable('amil');
  },
};