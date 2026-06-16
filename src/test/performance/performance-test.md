# 🔬 K6 Performance Testing

Panduan ini menjelaskan cara melakukan performance testing menggunakan [k6](https://k6.io/) untuk endpoint login pada aplikasi ini.

---

## ✅ Prasyarat

- Node.js & npm (opsional, hanya untuk manajemen proyek)
- Aplikasi backend sudah berjalan (misalnya di `http://localhost:3000`)
- Terminal dengan akses internet

---

## 📦 Instalasi K6

### Global (rekomendasi)

```bash
npm install -g k6
```
---

## 🚀 cara run K6
```bash
cd src/test/performance
```

command
```bash
k6 run src/performance/<file yang di test> --env BASE_URL=<your API> --env K6_EMAIL=<your dummy EMAIL> --env K6_PASSWORD=<your dummy PASSWORD>
```
---

## Catatan

* Gunakan akun yang valid dan sudah terdaftar pada database.
* Pastikan backend sudah berjalan sebelum menjalankan pengujian.
* Jika menggunakan port atau URL yang berbeda, sesuaikan nilai `BASE_URL`.
* Pastikan endpoint yang digunakan sesuai dengan konfigurasi backend.