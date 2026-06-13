"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mustahik", [
      {
        nama_lengkap: "Mustahik 1",
        nomor_telpon: "081234567811",
        alamat: "Bandung, Jawa Barat",
        nik: "3201123456789101",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1998-07-12",
        jenis_kelamin: "perempuan",
        kategori: "miskin",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      // {
      //   nama_lengkap: "Mustahik 2",
      //   nomor_telpon: "081234567812",
      //   alamat: "Jakarta, DKI Jakarta",
      //   nik: "3201123456789102",
      //   tempat_lahir: "Jakarta",
      //   tanggal_lahir: "1995-03-20",
      //   jenis_kelamin: "laki-laki",
      //   kategori: "fakir",
      //   created_at: new Date(),
      //   updated_at: null,
      //   deleted_at: null,
      //   deleted_status: 0,
      // },
      // {
      //   nama_lengkap: "Mustahik 3",
      //   nomor_telpon: "081234567813",
      //   alamat: "Surabaya, Jawa Timur",
      //   nik: "3201123456789103",
      //   tempat_lahir: "Surabaya",
      //   tanggal_lahir: "2000-11-02",
      //   jenis_kelamin: "perempuan",
      //   kategori: "mualaf",
      //   created_at: new Date(),
      //   updated_at: null,
      //   deleted_at: null,
      //   deleted_status: 0,
      // },
      // {
      //   nama_lengkap: "Mustahik 4",
      //   nomor_telpon: "081234567814",
      //   alamat: "Semarang, Jawa Tengah",
      //   nik: "3201123456789104",
      //   tempat_lahir: "Semarang",
      //   tanggal_lahir: "1992-06-18",
      //   jenis_kelamin: "laki-laki",
      //   kategori: "fisabilillah",
      //   created_at: new Date(),
      //   updated_at: null,
      //   deleted_at: null,
      //   deleted_status: 0,
      // },
      // {
      //   nama_lengkap: "Mustahik 5",
      //   nomor_telpon: "082754897589",
      //   alamat: "Bandung, Jawa Barat",
      //   nik: "890583907501",
      //   tempat_lahir: "Bandung",
      //   tanggal_lahir: "1998-07-12",
      //   jenis_kelamin: "perempuan",
      //   kategori: "miskin",
      //   created_at: new Date(),
      //   updated_at: null,
      //   deleted_at: null,
      //   deleted_status: 0,
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("mustahik", null, {});
  },
};
