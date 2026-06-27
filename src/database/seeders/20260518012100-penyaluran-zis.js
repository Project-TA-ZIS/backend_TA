"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("penyaluran_zis", [
      {
        mustahik_id: 1,
        nama_mustahik: "Maman Suparman",
        kategori: "zakat mal",
        jumlah: 1000000,
        deskripsi: "Bantuan kebutuhan pokok dan biaya sekolah",
        tanggal_penyaluran: "2026-05-22",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        mustahik_id: 2,
        nama_mustahik: "Yayah Rokayah",
        kategori: "zakat fitrah uang",
        jumlah: 300000,
        deskripsi: "Penyaluran zakat fitrah",
        tanggal_penyaluran: "2026-05-23",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        mustahik_id: 3,
        nama_mustahik: "Samsudin",
        kategori: "infaq",
        jumlah: 400000,
        deskripsi: "Bantuan perbaikan rumah",
        tanggal_penyaluran: "2026-05-24",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        mustahik_id: 4,
        nama_mustahik: "Aisyah Putri",
        kategori: "shodaqoh",
        jumlah: 250000,
        deskripsi: "Bantuan perlengkapan ibadah",
        tanggal_penyaluran: "2026-05-25",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        mustahik_id: 5,
        nama_mustahik: "Ujang Hermansyah",
        kategori: "zakat fitrah beras",
        jumlah: 15,
        deskripsi: "Penyaluran beras zakat fitrah",
        tanggal_penyaluran: "2026-05-26",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("penyaluran_zis", null, {});
  },
};
