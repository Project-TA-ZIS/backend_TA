\# Backend TA — Monitoring Dasawisma & ZIS

Backend service untuk kebutuhan Monitoring **Dasawisma** dan **Zakat/Infaq/Shodaqoh (ZIS)**.

## Tech Stack

- Node.js + Express
- MySQL / MariaDB
- Sequelize CLI (migration & seeder)
- JWT Auth (Bearer token)

## Prasyarat

- Node.js (disarankan LTS)
- MySQL / MariaDB

## Menjalankan Project (Local)

1) Install dependency

```bash
npm install
```

2) Buat file `.env` di root project

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

Project sudah punya konfigurasi Sequelize CLI lewat `.sequelizerc`.

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5) Jalankan server

```bash
npm start
```

Server akan listen di `http://localhost:${PORT}`.

## Konfigurasi Database

- Koneksi MySQL dipakai lewat: `src/config/db_connection.js`
- Konfigurasi Sequelize CLI: `src/config/sequelize.js`
- Panduan migration/seeder tambahan ada di: `src/database/step-database.md`

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

Catatan: beberapa endpoint melakukan pengecekan role dan akan mengembalikan `403` jika role tidak sesuai.

## Akun Seed (Default)

Seeder yang tersedia akan membuat 1 akun koordinator:

- Email: `koordinator@dasawisma.com`
- Password: `koordinator123`
- Roles: `koordinator dasawisma`

Selain itu (contoh akun amil), perlu dibuat via endpoint create (lihat bagian **Amil**).

## Base URL

- Local: `http://localhost:<PORT>`

## API Guide

Di bawah ini daftar endpoint sesuai routing di `src/app.js`.

> Notasi: `🔒` = butuh token (JWT). `👮` = ada pembatasan role.

### 1) Auth

#### POST `/auth/post/login`

Login dengan email & password. Mengembalikan token JWT.

Body:

```json
{
	"email": "koordinator@dasawisma.com",
	"password": "koordinator123"
}
```

Response (contoh):

```json
{
	"message": "login berhasil",
	"token": "<jwt>"
}
```

#### GET `/auth/get/me` 🔒

Ambil data user yang sedang login (berdasarkan token).

---

### 2) Amil (ZIS) — `/amil/*` 🔒

Semua endpoint di bawah membutuhkan JWT karena route `/amil` diproteksi di level app.

- GET `/amil/get/getAllAmil`
- GET `/amil/get/getAmil/:id`
- POST `/amil/post/createAmil` 🔒👮 (hanya `koordinator dasawisma`)
- PUT `/amil/put/updateAmil/:id`
- DELETE `/amil/delete/deleteAmil/:id` 👮 (hanya `koordinator dasawisma`)

Body create (contoh):

```json
{
	"nama_lengkap": "Amil 1",
	"email": "amil1@example.com",
	"nomor_telpon": "08123456789",
	"alamat": "Bandung",
	"password": "admin123"
}
```

---

### 3) Anggota/Koordinator Dasawisma — `/dasawisma/*` 🔒

- GET `/dasawisma/get/getAllAnggota`
- GET `/dasawisma/get/getAnggota/:id`
- POST `/dasawisma/post/createAnggota` 👮 (hanya `koordinator dasawisma`)
- PUT `/dasawisma/update/updateAnggota/:id`
- DELETE `/dasawisma/delete/deleteAnggota/:id` 👮 (hanya `koordinator dasawisma`)

Body create (contoh):

```json
{
	"nama_lengkap": "Anggota Dasawisma",
	"email": "anggota1@dasawisma.com",
	"password": "password123",
	"roles": "anggota dasawisma"
}
```

---

### 4) Mustahik — `/mustahik/*` 🔒

- GET `/mustahik/get/getAllMustahik`
- GET `/mustahik/get/getMustahik/:id`
- POST `/mustahik/post/createMustahik` 👮 (hanya `amil zakat`)
- PUT `/mustahik/put/editMustahik/:id` 👮 (hanya `amil zakat`)
- DELETE `/mustahik/delete/deleteMustahik/:id` 👮 (hanya `amil zakat`)

Body create/edit (contoh):

```json
{
	"nama_lengkap": "Mustahik 1",
	"nomor_telpon": "08123456789",
	"alamat": "Bandung",
	"nik": "3201123456789012",
	"tempat_lahir": "Bandung",
	"tanggal_lahir": "1995-02-01",
	"jenis_kelamin": "laki-laki",
	"kategori": "miskin"
}
```

---

### 5) Muzakki — `/muzakki/*` 🔒

- GET `/muzakki/get/getAllMuzakki`
- GET `/muzakki/get/getMuzakkiById/:id`
- POST `/muzakki/post/createMuzakki` 👮 (hanya `amil zakat`)
- PUT `/muzakki/put/editMuzakki/:id` 👮 (hanya `amil zakat`)
- DELETE `/muzakki/delete/deleteMuzakki/:id`

Body create/edit (contoh):

```json
{
	"nama_lengkap": "Muzakki 1",
	"email": "muzakki1@example.com",
	"nomor_telpon": "08123456789",
	"alamat": "Bandung",
	"npwp": "01.234.567.8-901.000",
	"nik": "3201123456789013",
	"tempat_lahir": "Bandung",
	"tanggal_lahir": "1992-10-10",
	"jenis_kelamin": "perempuan",
	"pekerjaan": "Karyawan"
}
```

---

### 6) Pemasukan ZIS — `/pemasukanZIS/*`

Catatan: route `/pemasukanZIS` tidak diproteksi di level app, tapi beberapa endpoint diproteksi di level route.

- GET `/pemasukanZIS/get/getAllPemasukanZIS` (tanpa token)
- GET `/pemasukanZIS/get/getPemasukanZISById/:id` (tanpa token)
- POST `/pemasukanZIS/add/addPemasukanZIS` 🔒👮 (hanya `amil zakat`)
- PUT `/pemasukanZIS/update/updatePemasukanZIS/:id` 🔒👮 (hanya `amil zakat`)
- DELETE `/pemasukanZIS/delete/deletePemasukanZIS/:id` 🔒👮 (hanya `amil zakat`)

Body add/update (contoh):

```json
{
	"muzakki_id": 1,
	"kategori": "zakat mal",
	"jumlah": 100000,
	"deskripsi": "Pembayaran zakat",
	"tanggal_penghimpunan": "2026-05-15T10:00:00.000Z"
}
```

---

### 7) Pengeluaran/Penyaluran ZIS — `/pengeluaranZIS/*`

- GET `/pengeluaranZIS/get/getAllPengeluaranZIS` (tanpa token)
- GET `/pengeluaranZIS/get/getPengeluaranZISById/:id` (tanpa token)
- POST `/pengeluaranZIS/add/addPengeluaranZIS` 🔒👮 (hanya `amil zakat`)
- PUT `/pengeluaranZIS/update/updatePengeluaranZIS/:id` 🔒👮 (hanya `amil zakat`)

Body add/update (contoh):

```json
{
	"mustahik_id": 1,
	"kategori": "zakat mal",
	"jumlah": 50000,
	"deskripsi": "Bantuan mustahik",
	"tanggal_penyaluran": "2026-05-15T10:00:00.000Z"
}
```

---

### 8) Total ZIS — `/totalZIS/*`

- GET `/totalZIS/get/getTotalZISByKategori` (tanpa token)
- GET `/totalZIS/get/getTotalAllPemasukanZIS` (tanpa token)

## Contoh Pemakaian (cURL)

### Login → ambil token

```bash
curl -X POST http://localhost:3000/auth/post/login \
	-H "Content-Type: application/json" \
	-d "{\"email\":\"koordinator@dasawisma.com\",\"password\":\"koordinator123\"}"
```

### GET profile user login

```bash
curl http://localhost:3000/auth/get/me \
	-H "Authorization: Bearer <token>"
```

### (Koordinator) buat akun amil

```bash
curl -X POST http://localhost:3000/amil/post/createAmil \
	-H "Authorization: Bearer <token>" \
	-H "Content-Type: application/json" \
	-d "{\"nama_lengkap\":\"Amil 1\",\"email\":\"amil1@example.com\",\"nomor_telpon\":\"08123456789\",\"alamat\":\"Bandung\",\"password\":\"admin123\"}"
```

## Catatan Implementasi

- Format path endpoint saat ini menggunakan pola `/get/...`, `/post/...`, `/put/...`, dsb (sesuai file routes).
- Untuk perubahan struktur endpoint atau penambahan modul (mis. transaksi Dasawisma lain), pastikan route-nya terdaftar di `src/app.js`.

