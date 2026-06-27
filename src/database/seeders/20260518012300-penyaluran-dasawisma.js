"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("penyaluran_dasawisma", [
      {
        rw_id: 1,
        jumlah: 65000,
        deskripsi: "Pembelian perlengkapan kerja bakti",
        tanggal_penyaluran: "2026-05-12",
        nama_anggota: "Siti Aminah",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 2,
        jumlah: 40000,
        deskripsi: "Konsumsi rapat dasawisma",
        tanggal_penyaluran: "2026-05-13",
        nama_anggota: "Dewi Lestari",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 5,
        jumlah: 75000,
        deskripsi: "Pembelian bibit tanaman",
        tanggal_penyaluran: "2026-05-15",
        nama_anggota: "Maya Sari",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("penyaluran_dasawisma", null, {});
  },
};
