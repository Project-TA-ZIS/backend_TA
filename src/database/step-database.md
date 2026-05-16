# Database Migration & Seeder Guide

Project ini menggunakan Sequelize CLI untuk mengelola:

- Migration
- Seeder

---

# 📁 Struktur Folder

```plaintext
src/
└── database/
    ├── migrations/
    └── seeders/
```

---

# ⚙️ Konfigurasi Database

Pastikan file `.env` sudah tersedia pada root project.

Contoh:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_monitoring_dasawisma_zis
DB_PORT=3306

NODE_ENV=development
JWT_SECRET=replace-with-strong-secret
```

---

# ⚙️ Konfigurasi Sequelize

File:

```plaintext
src/config/sequelize.js
```

Contoh konfigurasi:

```js
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
```

---

# 🗄️ Membuat Database

Buat database kosong terlebih dahulu di MySQL / MariaDB.

```sql
CREATE DATABASE db_monitoring_dasawisma_zis;
```

---

# 🚀 Menjalankan Migration

Migration digunakan untuk membuat struktur tabel database.

```bash
npx sequelize-cli db:migrate
```

---

# 🌱 Menjalankan Seeder

Seeder digunakan untuk mengisi data default.

## Menjalankan semua seeder

```bash
npx sequelize-cli db:seed:all
```

## Menjalankan satu seeder tertentu

```bash
npx sequelize-cli db:seed --seed nama-file-seeder.js
```

Contoh:

```bash
npx sequelize-cli db:seed --seed 202605140001-seed-default-total-zis.js
```

---

# 🛠️ Membuat Migration Baru

```bash
npx sequelize-cli migration:generate --name nama-migration
```

Contoh:

```bash
npx sequelize-cli migration:generate --name create-amil-table
```

---

# 🌱 Membuat Seeder Baru

```bash
npx sequelize-cli seed:generate --name nama-seeder
```

Contoh:

```bash
npx sequelize-cli seed:generate --name seed-default-total-zis
```

---

# ⏪ Rollback Migration

## Undo migration terakhir

```bash
npx sequelize-cli db:migrate:undo
```

## Undo semua migration

```bash
npx sequelize-cli db:migrate:undo:all
```

---

# ⏪ Rollback Seeder

## Undo seeder terakhir

```bash
npx sequelize-cli db:seed:undo
```

## Undo semua seeder

```bash
npx sequelize-cli db:seed:undo:all
```

---

# 📌 Catatan

- Migration dijalankan berdasarkan urutan timestamp file.
- Seeder digunakan untuk data default awal aplikasi.
- Jangan mengubah migration yang sudah dijalankan pada production.
- Jika ada perubahan tabel, buat migration baru.

---
