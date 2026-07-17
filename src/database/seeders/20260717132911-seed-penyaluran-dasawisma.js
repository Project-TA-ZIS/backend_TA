"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("penyaluran_dasawisma", [
      // RW 1
      {
        rw_id: 1,
        jumlah: 100000,
        deskripsi: "Pembelian alat kebersihan",
        tanggal_penyaluran: "2026-01-15",
        nama_anggota: "Admin",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
      {
        rw_id: 1,
        jumlah: 75000,
        deskripsi: "Konsumsi rapat bulanan",
        tanggal_penyaluran: "2026-01-28",
        nama_anggota: "Siti Aminah",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
      {
        rw_id: 1,
        jumlah: 50000,
        deskripsi: "Pembelian ATK",
        tanggal_penyaluran: "2026-02-10",
        nama_anggota: "Nur Aisyah",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
      {
        rw_id: 1,
        jumlah: 125000,
        deskripsi: "Bantuan kegiatan PKK",
        tanggal_penyaluran: "2026-02-20",
        nama_anggota: "Dewi Lestari",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },

      // RW 2
      {
        rw_id: 2,
        jumlah: 150000,
        deskripsi: "Pembelian perlengkapan posyandu",
        tanggal_penyaluran: "2026-01-20",
        nama_anggota: "Rina Kartika",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
      {
        rw_id: 2,
        jumlah: 100000,
        deskripsi: "Kegiatan kerja bakti",
        tanggal_penyaluran: "2026-02-12",
        nama_anggota: "Yuliana Sari",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
      {
        rw_id: 2,
        jumlah: 125000,
        deskripsi: "Pembelian tanaman penghijauan",
        tanggal_penyaluran: "2026-02-25",
        nama_anggota: "Lilis Handayani",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
      {
        rw_id: 2,
        jumlah: 200000,
        deskripsi: "Bantuan sosial warga",
        tanggal_penyaluran: "2026-03-05",
        nama_anggota: "Maya Wulandari",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("penyaluran_dasawisma", null, {});
  },
};
