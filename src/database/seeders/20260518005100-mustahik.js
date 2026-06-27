"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("mustahik", [
      {
        nama_lengkap: "Maman Suparman",
        nomor_telpon: "081234567811",
        alamat: "Jl. Babakan No. 8, Bandung",
        nik: "3201123456789101",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1968-07-12",
        jenis_kelamin: "laki-laki",
        kategori: "miskin",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "Yayah Rokayah",
        nomor_telpon: "081234567812",
        alamat: "Jl. Pasir Koja No. 16, Bandung",
        nik: "3201123456789102",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1972-02-21",
        jenis_kelamin: "perempuan",
        kategori: "miskin",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "Samsudin",
        nomor_telpon: "081234567813",
        alamat: "Jl. Cibaduyut No. 30, Bandung",
        nik: "3201123456789103",
        tempat_lahir: "Garut",
        tanggal_lahir: "1959-09-04",
        jenis_kelamin: "laki-laki",
        kategori: "fakir",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "Aisyah Putri",
        nomor_telpon: "081234567814",
        alamat: "Jl. Peta No. 2, Bandung",
        nik: "3201123456789104",
        tempat_lahir: "Cianjur",
        tanggal_lahir: "1996-05-18",
        jenis_kelamin: "perempuan",
        kategori: "mualaf",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        nama_lengkap: "Ujang Hermansyah",
        nomor_telpon: "081234567815",
        alamat: "Jl. Astana Anyar No. 44, Bandung",
        nik: "3201123456789105",
        tempat_lahir: "Tasikmalaya",
        tanggal_lahir: "1983-10-11",
        jenis_kelamin: "laki-laki",
        kategori: "berhutang",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("mustahik", null, {});
  },
};
