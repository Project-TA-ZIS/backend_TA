const transaksi = require("../transaksi.models");

class PengeluaranZIS extends transaksi {
  constructor(data) {
    super(data);
    this.mustahik_id = data.mustahik_id ?? null;
    this.kategori = data.kategori ?? null; // ENUM: zakat fitrah, zakat mal, shodaqoh, infaq
    this.tanggal_penyaluran = data.tanggal_penyaluran;
    this.nama_mustahik = data.nama_mustahik ?? null;
  }
}

module.exports = PengeluaranZIS;
