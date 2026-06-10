# Backend TA — Monitoring Dasawisma & ZIS

Backend service (REST API) untuk **Sistem Monitoring Keuangan Dasawisma** dan
**ZIS (Zakat, Infaq, Shodaqoh)**. Menyediakan autentikasi berbasis JWT,
manajemen data anggota/muzakki/mustahik, pencatatan pemasukan & penyaluran dana,
rekap total kas, serta dokumentasi API interaktif via Swagger.

---

## ✨ Fitur

- **Autentikasi JWT** — login, ambil profil, lupa & reset password via email.
- **Manajemen Pengguna** — anggota Dasawisma, Amil, Muzakki, Mustahik.
- **Monitoring Dasawisma** — pemasukan, penyaluran (pengeluaran), dan total kas.
- **Monitoring ZIS** — pemasukan ZIS, penyaluran ZIS, rekap total per kategori.
- **Soft Delete** — data ditandai (`deleted_status`/`deleted_at`), bukan dihapus permanen.
- **Dokumentasi API** — Swagger UI (OpenAPI 3.0).
- **Reset Password via Email** — pengiriman link reset menggunakan Nodemailer.

---

## 🛠️ Tech Stack

| Kategori        | Teknologi                              |
| --------------- | -------------------------------------- |
| Runtime         | Node.js                                |
| Framework       | Express 5                              |
| Database        | MySQL / MariaDB (`mysql2`)             |
| ORM             | Sequelize 6 + Sequelize CLI            |
| Autentikasi     | JSON Web Token (`jsonwebtoken`)        |
| Hashing         | bcrypt                                 |
| Email           | Nodemailer (Gmail)                     |
| Dokumentasi     | swagger-jsdoc + swagger-ui-express     |
| Lainnya         | cors, dotenv, uuid, chalk, nodemon     |

---

## 🧱 Arsitektur (Layered)

Setiap domain mengikuti alur berlapis agar mudah dirawat:

```
Request → Routes → Middleware (verifyToken/JWT) → Controller → Repository → Model (Sequelize) → Database                 
```

- **Routes** (`src/routes`) — mendefinisikan endpoint & memasang middleware.
- **Controller** (`src/controllers`) — menangani request/response & validasi.
- **Repository** (`src/repositories`) — logika akses data (query Sequelize).
- **Model** (`src/models`) — definisi tabel/skema Sequelize.
- **Middleware** (`src/middleware`) — `verifyToken` memverifikasi Bearer JWT.
- **Documentation** (`src/documentation`) — anotasi Swagger (`*.swagger.js`) dipisah dari routes agar tetap rapi.

---

## 📁 Struktur Proyek

```
backend_TA/
├── src/
│   ├── app.js                 # konfigurasi Express, mount semua routes & Swagger
│   ├── index.js               # entry point, menjalankan server (app.listen)
│   ├── config/
│   │   ├── db_connection.js   # koneksi MySQL
│   │   ├── sequelize.js       # konfigurasi Sequelize CLI
│   │   ├── mail.config.js     # transporter Nodemailer (Gmail)
│   │   └── swagger.js         # definisi OpenAPI & komponen schema
│   ├── controllers/           # ZIS, dasawisma, auth
│   ├── repositories/          # akses data per domain
│   ├── models/                # model Sequelize (users, transaksi, total_kas)
│   ├── routes/                # definisi endpoint per domain
│   ├── documentation/         # anotasi Swagger (*.swagger.js)
│   ├── middleware/
│   │   └── verifyToken.js     # verifikasi JWT (Bearer)
│   └── database/
│       ├── migrations/        # skema tabel
│       ├── seeders/           # data awal
│       └── step-database.md   # panduan migration & seeder
├── .env.example
├── .sequelizerc               # path config/migrations/seeders untuk Sequelize CLI
└── package.json
```

---

## 🚀 Menjalankan Project (Local)

### 1. Prasyarat

- **Node.js** (disarankan versi LTS)
- **MySQL / MariaDB**

### 2. Install dependency

```bash
cd backend_TA
npm install
```

### 3. Konfigurasi `.env`

Buat file `.env` di root `backend_TA` (acuan: `.env.example`).

> ⚠️ File `.env` sudah masuk `.gitignore` — jangan di-commit.

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_monitoring_dasawisma_zis
DB_PORT=3306

# Autentikasi
JWT_SECRET=ganti-dengan-secret-yang-kuat

# Frontend (dipakai untuk link reset password)
WEB_URL=http://localhost:5173

# Email (Nodemailer / Gmail)
SERVICE=gmail
AUTH_EMAIL=email-anda@gmail.com
AUTH_PASSWORD=app-password-gmail
```

> 💡 `AUTH_PASSWORD` sebaiknya memakai **App Password** Gmail, bukan password akun biasa.

### 4. Buat database kosong

```sql
CREATE DATABASE db_monitoring_dasawisma_zis;
```

### 5. Jalankan migration & seeder

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 6. Jalankan server

```bash
npm start
```

Server berjalan dengan **nodemon** (auto-reload). Setelah aktif:

- API Base URL: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/api-docs`

---

## 🔐 Autentikasi & Otorisasi

Endpoint terproteksi membutuhkan header:

```
Authorization: Bearer <token>
Content-Type: application/json
```

- Token dibuat saat **login** dan berlaku **1 jam**.
- Middleware `verifyToken` menolak request tanpa token (`401`) atau token invalid/kadaluarsa (`403`), lalu menyuntik `req.id` dan `req.roles`.

### Roles

- `koordinator dasawisma`
- `anggota dasawisma`
- `amil zakat`

> Catatan: pada `app.js`, beberapa grup route dipasang `verifyJWT` di level mount
> (mis. `/amil`, `/dasawisma`, `/pemasukanDasawisma`, `/totalKasDasawisma`,
> `/pengeluaranDasawisma`), sementara grup lain memasang `verifyJWT` per endpoint
> tertentu saja (mis. operasi tulis pada `/muzakki`, `/mustahik`, ZIS).

---

## 📡 Daftar Endpoint

Base URL: `http://localhost:<PORT>`

### Auth — `/auth`

| Method | Path                                    | Keterangan                  | Auth |
| ------ | --------------------------------------- | --------------------------- | :--: |
| POST   | `/auth/post/login`                      | Login, mengembalikan token  |  —   |
| GET    | `/auth/get/me`                          | Profil user yang login      |  ✅  |
| POST   | `/auth/post/forgot-password`            | Minta link reset password   |  —   |
| POST   | `/auth/post/reset-password`             | Reset password via token    |  —   |
| GET    | `/auth/get/validate-reset-token/:token` | Validasi token reset        |  —   |

### Amil — `/amil` *(mount ber-JWT)*

| Method | Path                          | Keterangan          |
| ------ | ----------------------------- | ------------------- |
| GET    | `/amil/get/getAllAmil`        | Daftar amil         |
| GET    | `/amil/get/getAmil/:id`       | Detail amil         |
| POST   | `/amil/post/createAmil`       | Tambah amil         |
| PUT    | `/amil/put/updateAmil/:id`    | Ubah amil           |
| PUT    | `/amil/put/updateAmilPassword`| Ubah password amil  |
| DELETE | `/amil/delete/deleteAmil/:id` | Hapus amil          |

### Anggota Dasawisma — `/dasawisma` *(mount ber-JWT)*

| Method | Path                                  | Keterangan         |
| ------ | ------------------------------------- | ------------------ |
| GET    | `/dasawisma/get/getAllAnggota`        | Daftar anggota     |
| GET    | `/dasawisma/get/getAnggota/:id`       | Detail anggota     |
| POST   | `/dasawisma/post/createAnggota`       | Tambah anggota     |
| PUT    | `/dasawisma/update/updateAnggota/:id` | Ubah anggota       |
| PUT    | `/dasawisma/update/updatePassword`    | Ubah password      |
| DELETE | `/dasawisma/delete/deleteAnggota/:id` | Hapus anggota      |

### Muzakki — `/muzakki`

| Method | Path                              | Keterangan        | Auth |
| ------ | --------------------------------- | ----------------- | :--: |
| GET    | `/muzakki/get/getAllMuzakki`      | Daftar muzakki    |  —   |
| GET    | `/muzakki/get/getMuzakkiById/:id` | Detail muzakki    |  ✅  |
| POST   | `/muzakki/post/createMuzakki`     | Tambah muzakki    |  ✅  |
| PUT    | `/muzakki/put/editMuzakki/:id`    | Ubah muzakki      |  ✅  |
| DELETE | `/muzakki/delete/deleteMuzakki/:id`| Hapus muzakki    |  ✅  |

### Mustahik — `/mustahik`

| Method | Path                                | Keterangan       | Auth |
| ------ | ----------------------------------- | ---------------- | :--: |
| GET    | `/mustahik/get/getAllMustahik`      | Daftar mustahik  |  —   |
| GET    | `/mustahik/get/getMustahik/:id`     | Detail mustahik  |  ✅  |
| POST   | `/mustahik/post/createMustahik`     | Tambah mustahik  |  ✅  |
| PUT    | `/mustahik/put/editMustahik/:id`    | Ubah mustahik    |  ✅  |
| DELETE | `/mustahik/delete/deleteMustahik/:id`| Hapus mustahik  |  ✅  |

### Pemasukan ZIS — `/pemasukanZIS`

| Method | Path                                            | Keterangan              | Auth |
| ------ | ----------------------------------------------- | ----------------------- | :--: |
| GET    | `/pemasukanZIS/get/getAllPemasukanZIS`          | Daftar pemasukan ZIS    |  —   |
| GET    | `/pemasukanZIS/get/getPemasukanZISById/:id`     | Detail pemasukan ZIS    |  —   |
| GET    | `/pemasukanZIS/get/getRiwayatPemasukanZISByNik` | Riwayat berdasarkan NIK |  —   |
| POST   | `/pemasukanZIS/add/addPemasukanZIS`             | Tambah pemasukan ZIS    |  ✅  |
| PUT    | `/pemasukanZIS/update/updatePemasukanZIS/:id`   | Ubah pemasukan ZIS      |  ✅  |
| DELETE | `/pemasukanZIS/delete/deletePemasukanZIS/:id`   | Hapus pemasukan ZIS     |  ✅  |

### Pengeluaran ZIS — `/pengeluaranZIS`

| Method | Path                                              | Keterangan             | Auth |
| ------ | ------------------------------------------------- | ---------------------- | :--: |
| GET    | `/pengeluaranZIS/get/getAllPengeluaranZIS`        | Daftar pengeluaran ZIS |  —   |
| GET    | `/pengeluaranZIS/get/getPengeluaranZISById/:id`   | Detail pengeluaran ZIS |  —   |
| POST   | `/pengeluaranZIS/add/addPengeluaranZIS`           | Tambah pengeluaran ZIS |  ✅  |
| PUT    | `/pengeluaranZIS/update/updatePengeluaranZIS/:id` | Ubah pengeluaran ZIS   |  ✅  |

### Total ZIS — `/totalZIS`

| Method | Path                                  | Keterangan                  |
| ------ | ------------------------------------- | --------------------------- |
| GET    | `/totalZIS/get/getTotalZISByKategori` | Total ZIS per kategori      |
| GET    | `/totalZIS/get/getTotalAllPemasukanZIS`| Total seluruh pemasukan ZIS|

### Pemasukan Dasawisma — `/pemasukanDasawisma` *(mount ber-JWT)*

| Method | Path                                            | Keterangan          |
| ------ | ----------------------------------------------- | ------------------- |
| GET    | `/pemasukanDasawisma/get/getAllPemasukan`       | Daftar pemasukan    |
| GET    | `/pemasukanDasawisma/get/getPemasukan/:id`      | Detail pemasukan    |
| POST   | `/pemasukanDasawisma/post/createPemasukan`      | Tambah pemasukan    |
| PUT    | `/pemasukanDasawisma/update/updatePemasukan/:id`| Ubah pemasukan      |

### Pengeluaran Dasawisma — `/pengeluaranDasawisma` *(mount ber-JWT)*

| Method | Path                                                | Keterangan           |
| ------ | --------------------------------------------------- | -------------------- |
| GET    | `/pengeluaranDasawisma/get/getAllPengeluaran`       | Daftar pengeluaran   |
| GET    | `/pengeluaranDasawisma/get/getPengeluaran/:id`      | Detail pengeluaran   |
| POST   | `/pengeluaranDasawisma/post/createPengeluaran`      | Tambah pengeluaran   |
| PUT    | `/pengeluaranDasawisma/update/updatePengeluaran/:id`| Ubah pengeluaran     |

### Total Kas Dasawisma — `/totalKasDasawisma` *(mount ber-JWT)*

| Method | Path                                          | Keterangan        |
| ------ | --------------------------------------------- | ----------------- |
| GET    | `/totalKasDasawisma/get/getTotalKasDasawisma` | Total kas saat ini|

---

## 📚 Dokumentasi API (Swagger)

- Swagger UI: `http://localhost:<PORT>/api-docs`
- Anotasi OpenAPI dipisah dari routes agar rapi:
  - Lokasi: `src/documentation/**/*.swagger.js`
  - Definisi schema & `bearerAuth` ada di `src/config/swagger.js`

---

## 🗄️ Database & Sequelize CLI

Konfigurasi path Sequelize diatur di `.sequelizerc`:

| Item            | Lokasi                       |
| --------------- | ---------------------------- |
| Config          | `src/config/sequelize.js`    |
| Migrations      | `src/database/migrations`    |
| Seeders         | `src/database/seeders`       |

Perintah yang sering dipakai:

```bash
# jalankan semua migration
npx sequelize-cli db:migrate

# rollback migration terakhir
npx sequelize-cli db:migrate:undo

# jalankan semua seeder
npx sequelize-cli db:seed:all

# batalkan semua seeder
npx sequelize-cli db:seed:undo:all
```

Panduan lebih rinci: `src/database/step-database.md`.

---

## 👤 Akun Seed (Default)

Seeder membuat akun koordinator awal:

- Email: `koordinator@dasawisma.com`
- Role: `koordinator dasawisma`

> Password default tidak ditulis di sini. Untuk testing lokal, cek file seeder:
> `src/database/seeders/20260514094753-seed-anggota-dasawisma.js`.

---

## 📜 Skrip NPM

| Perintah        | Keterangan                              |
| --------------- | --------------------------------------- |
| `npm start`     | Menjalankan server via nodemon          |
| `npm test`      | Placeholder (belum ada test)            |

---

## 📝 Catatan

- Semua response error mengikuti format `{ message, error }` (lihat schema `ErrorResponse` di Swagger).
- Fitur reset password mengirim email berisi link ke `WEB_URL` — pastikan konfigurasi email & `WEB_URL` benar.
- Data menggunakan pola **soft delete** (`deleted_status`, `deleted_at`).