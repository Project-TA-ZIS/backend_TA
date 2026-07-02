"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("pemasukan_dasawisma", [
      {
        anggota_dasawisma_id: 1,
        rw_id: 1,
        nama_anggota: "Siti Aminah",
        sumber: "IURAN",
        jumlah: 150000,
        deskripsi: "Iuran rutin warga RW 001",
        tanggal_penghimpunan: "2026-05-02",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        anggota_dasawisma_id: 2,
        rw_id: 2,
        nama_anggota: "Dewi Lestari",
        sumber: "IURAN",
        jumlah: 125000,
        deskripsi: "Iuran rutin warga RW 002",
        tanggal_penghimpunan: "2026-05-03",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        anggota_dasawisma_id: 3,
        rw_id: 3,
        nama_anggota: "Rina Marlina",
        sumber: "LAINNYA",
        jumlah: 100000,
        deskripsi: "Donasi kegiatan posyandu",
        tanggal_penghimpunan: "2026-05-04",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        anggota_dasawisma_id: 4,
        rw_id: 4,
        nama_anggota: "Novi Kartika",
        sumber: "IURAN",
        jumlah: 75000,
        deskripsi: "Iuran rutin warga RW 004",
        tanggal_penghimpunan: "2026-05-05",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        anggota_dasawisma_id: 5,
        rw_id: 5,
        nama_anggota: "Maya Sari",
        sumber: "LAINNYA",
        jumlah: 200000,
        deskripsi: "Sumbangan kebersihan lingkungan",
        tanggal_penghimpunan: "2026-05-06",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        anggota_dasawisma_id: 6,
        rw_id: 6,
        nama_anggota: "Fitri Handayani",
        sumber: "IURAN",
        jumlah: 50000,
        deskripsi: "Iuran rutin warga RW 006",
        tanggal_penghimpunan: "2026-05-07",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pemasukan_dasawisma", null, {});
  },
};
