"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mustahik", {
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
      },
      tempat_lahir: Sequelize.STRING,
      tanggal_lahir: Sequelize.DATEONLY,
      jenis_kelamin: Sequelize.ENUM("laki-laki", "perempuan"),
      kategori: Sequelize.ENUM(
        "fakir",
        "miskin",
        "amil",
        "mualaf",
        "berhutang",
        "fisabilillah",
        "musafir",
      ),
      status_pekerjaan: Sequelize.ENUM("tetap", "tidak tetap"),
      pekerjaan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      penghasilan: {
        type: Sequelize.ENUM(
          "0-500000",
          "500001-5000000",
          "5000001-10000000",
          ">10000000",
        ),
        allowNull: true,
      },
      status_pernikahan: Sequelize.ENUM("menikah", "lajang", "cerai"),
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
    await queryInterface.dropTable("mustahik");
  },
};
