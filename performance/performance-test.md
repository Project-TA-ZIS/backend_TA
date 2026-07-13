# K6 Performance Testing

Panduan ini menjelaskan cara melakukan performance testing menggunakan k6.

## Prasyarat

- Node.js dan npm
- k6 sudah terinstall
- Backend sudah berjalan
- Akun test valid untuk login

## Instalasi k6

```bash
npm install -g k6
```

## Output raw result

Semua npm script performance test akan otomatis menyimpan data mentah ke folder:

```text
performance/result
```

Format file output:

```text
<timestamp>-<nama-test>.jsonl
```

Contoh:

```text
performance/result/2026-07-09T08-20-10-123Z-login.jsonl
```

File `.jsonl` berisi data mentah dari k6, satu JSON object per baris. Format ini cocok untuk diolah lagi menjadi grafik.

## Credential per skenario

Buat file berikut:

```text
performance/.env.test.local
```

Isi dengan variable berikut jika tiap skenario memakai akun berbeda:

```env
BASE_URL=http-api
K6_DASAWISMA_EMAIL=akun-dasawisma@example.com
K6_DASAWISMA_PASSWORD=password-dasawisma
K6_AMIL_EMAIL=akun-amil@example.com
K6_AMIL_PASSWORD=password-amil
```

Mapping akun:

- `perf:dasawisma` memakai `K6_DASAWISMA_EMAIL` dan `K6_DASAWISMA_PASSWORD`
- `perf:zis` memakai `K6_AMIL_EMAIL` dan `K6_AMIL_PASSWORD`
- `perf:login` memakai `K6_EMAIL` dan `K6_PASSWORD`

Jika variable role-specific tidak diisi, runner akan fallback ke `K6_EMAIL` dan `K6_PASSWORD`.

Untuk `perf:zis`, pastikan database sudah memiliki minimal satu data `muzakki` dan satu data `mustahik`, karena performance test hanya menguji transaksi pemasukan/pengeluaran ZIS dan tidak membuat master data.

Runner juga mendukung file `.env.performance` di root backend, tetapi untuk performance test disarankan memakai `performance/.env.test.local`.

## Cara run di Linux / Ubuntu / macOS

Login test:

```bash
BASE_URL=http-api \
K6_EMAIL=email-test@example.com \
K6_PASSWORD=password-test \
npm run perf:login
```

Dasawisma test:

```bash
BASE_URL=http-api \
K6_DASAWISMA_EMAIL=akun-dasawisma@example.com \
K6_DASAWISMA_PASSWORD=password-dasawisma \
npm run perf:dasawisma
```

ZIS test:

```bash
BASE_URL=http-api \
K6_AMIL_EMAIL=akun-amil@example.com \
K6_AMIL_PASSWORD=password-amil \
npm run perf:zis
```

Semua skenario:

```bash
BASE_URL=http-api \
K6_EMAIL=email-test@example.com \
K6_PASSWORD=password-test \
K6_DASAWISMA_EMAIL=akun-dasawisma@example.com \
K6_DASAWISMA_PASSWORD=password-dasawisma \
K6_AMIL_EMAIL=akun-amil@example.com \
K6_AMIL_PASSWORD=password-amil \
npm run perf:all
```

## Cara run di Windows PowerShell

```powershell
$env:BASE_URL="http-api"
$env:K6_EMAIL="email-test@example.com"
$env:K6_PASSWORD="password-test"
$env:K6_DASAWISMA_EMAIL="akun-dasawisma@example.com"
$env:K6_DASAWISMA_PASSWORD="password-dasawisma"
$env:K6_AMIL_EMAIL="akun-amil@example.com"
$env:K6_AMIL_PASSWORD="password-amil"
npm run perf:all
```

## Cara manual tanpa npm script

```bash
k6 run --out json=performance/result/login.jsonl performance/login.k6.js
```

## Catatan

- Gunakan akun yang valid dan sudah terdaftar pada database.
- Pastikan backend sudah berjalan sebelum menjalankan pengujian.
- Sesuaikan `BASE_URL`, `K6_EMAIL`, dan `K6_PASSWORD`.
- File hasil `.jsonl` diabaikan oleh Git agar raw result tidak ikut ter-commit.
