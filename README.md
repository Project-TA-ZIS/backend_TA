# Backend TA — Monitoring Dasawisma & ZIS

Backend service untuk kebutuhan Monitoring **Dasawisma** dan **Zakat/Infaq/Shodaqoh (ZIS)**.

## Tech Stack

- Node.js + Express
- MySQL / MariaDB
- Sequelize CLI (migration & seeder)
- JWT Auth (Bearer token)
- Swagger (OpenAPI)

## Prasyarat

- Node.js (disarankan LTS)
- MySQL / MariaDB

## Menjalankan Project (Local)

1) Install dependency

```bash
npm install
```

2) Buat file `.env` di root project

> Catatan: file `.env` sudah masuk `.gitignore` (jangan dipush).

Contoh minimal:

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

3) Buat database kosong di MySQL

```sql
CREATE DATABASE db_monitoring_dasawisma_zis;
```

4) Jalankan migration & seeder

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5) Jalankan server

```bash
npm start
```

## Dokumentasi API (Swagger)

- Swagger UI: `http://localhost:<PORT>/api-docs`
- Anotasi OpenAPI disimpan terpisah supaya file routes tetap rapih:
  - Lokasi: `src/documentation/**`
  - Pola nama: sama seperti file route, tetapi berekstensi `.swagger.js`

## Autentikasi (JWT)

Header yang dipakai:

```
Authorization: Bearer <token>
Content-Type: application/json
```

Token dibuat saat login dan berlaku **1 jam**.

### Roles

Role yang dipakai di backend (sesuai implementasi):

- `koordinator dasawisma`
- `anggota dasawisma`
- `amil zakat`

## Akun Seed (Default)

Seeder akan membuat 1 akun koordinator:

- Email: `koordinator@dasawisma.com`
- Roles: `koordinator dasawisma`

Password default untuk akun seed **tidak ditulis di README** (karena repo publik). Silakan cek file seeder jika dibutuhkan untuk testing lokal: `src/database/seeders/20260514094753-seed-anggota-dasawisma.js`.

## Referensi

- Koneksi MySQL: `src/config/db_connection.js`
- Konfigurasi Sequelize CLI: `src/config/sequelize.js` dan `.sequelizerc`
- Panduan migration/seeder: `src/database/step-database.md`
