'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mustahik', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_lengkap: Sequelize.STRING,
      nomor_telpon: Sequelize.STRING,
      alamat: Sequelize.STRING,
      nik: {
        type: Sequelize.STRING,
        unique: true,
      },
      tempat_lahir: Sequelize.STRING,
      tanggal_lahir: Sequelize.DATEONLY,
      jenis_kelamin: Sequelize.ENUM('laki-laki', 'perempuan'),
      kategori: Sequelize.ENUM(
        'fakir',
        'miskin',
        'amil',
        'mualaf',
        'berhutang',
        'fisabilillah',
        'musafir'
      ),
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
    await queryInterface.dropTable('mustahik');
  },
};