"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("koordinator123", 10);
    const anggota1 = await bcrypt.hash("anggota123", 10);
    const anggota2 = await bcrypt.hash("anggota456", 10);
    const anggota3 = await bcrypt.hash("anggota789", 10);
    const anggota4 = await bcrypt.hash("anggota012", 10);
    const anggota5 = await bcrypt.hash("anggota345", 10);
    const now = new Date();

    await queryInterface.bulkInsert("anggota_dasawisma", [
      {
        rw_id: 1,
        nama_lengkap: "penanggung jawab dasawisma",
        email: "penanggung.jawab@dasawisma.test",
        password: hashedPassword,
        nomor_telpon: "081234567890",
        nik: "3201123456789001",
        roles: "penanggung jawab dasawisma",
        alamat: "Jl. Melati No. 12, Bandung",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1990-01-01",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 2,
        nama_lengkap: "Dewi Lestari",
        email: "dewi.lestari@dasawisma.test",
        password: anggota1,
        nomor_telpon: "081234567891",
        nik: "3201123456789002",
        roles: "kader dasawisma",
        alamat: "Jl. Kenanga No. 5, Bandung",
        tempat_lahir: "Cimahi",
        tanggal_lahir: "1992-03-14",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 3,
        nama_lengkap: "Rina Marlina",
        email: "rina.marlina@dasawisma.test",
        password: anggota2,
        nomor_telpon: "081234567892",
        nik: "3201123456789003",
        roles: "kader dasawisma",
        alamat: "Jl. Anggrek No. 7, Bandung",
        tempat_lahir: "Garut",
        tanggal_lahir: "1988-08-22",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 4,
        nama_lengkap: "Novi Kartika",
        email: "novi.kartika@dasawisma.test",
        password: anggota3,
        nomor_telpon: "081234567893",
        nik: "3201123456789004",
        roles: "kader dasawisma",
        alamat: "Jl. Cempaka No. 18, Bandung",
        tempat_lahir: "Sumedang",
        tanggal_lahir: "1995-11-09",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 5,
        nama_lengkap: "Maya Sari",
        email: "maya.sari@dasawisma.test",
        password: anggota4,
        nomor_telpon: "081234567894",
        nik: "3201123456789005",
        roles: "kader dasawisma",
        alamat: "Jl. Teratai No. 21, Bandung",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1991-06-30",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
      {
        rw_id: 6,
        nama_lengkap: "Fitri Handayani",
        email: "fitri.handayani@dasawisma.test",
        password: anggota5,
        nomor_telpon: "081234567895",
        nik: "3201123456789006",
        roles: "kader dasawisma",
        alamat: "Jl. Mawar No. 3, Bandung",
        tempat_lahir: "Tasikmalaya",
        tanggal_lahir: "1989-12-17",
        created_at: now,
        updated_at: null,
        deleted_at: null,
        deleted_status: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("anggota_dasawisma", null, {});
  },
};
