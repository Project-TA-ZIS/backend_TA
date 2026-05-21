'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('anggota_dasawisma', {
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
      nik: {
        type: Sequelize.STRING,
      },
      roles: Sequelize.ENUM('kader dasawisma', 'penanggung jawab dasawisma'),
      alamat: Sequelize.STRING,
      tempat_lahir: Sequelize.STRING,
      tanggal_lahir: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('anggota_dasawisma');
  },
};