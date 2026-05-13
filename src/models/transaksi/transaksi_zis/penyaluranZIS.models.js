const transaksi = require("../transaksi.models");

class PengeluaranZIS extends transaksi {
  constructor(data) {
    super(data);
    this.mustahik_id = data.mustahik_id ?? null;
    this.kategori = data.kategori ?? null; // ENUM: zakat fitrah, zakat mal, shodaqoh, infaq
    this.tanggal_penyaluran = data.tanggal_penyaluran;
    this.created_at = data.created_at ?? new Date();
    this.updated_at = data.updated_at ?? null;
    this.deleted_at = data.deleted_at ?? null;
    this.deleted_status = data.deleted_status ?? 0;
  }
}

module.exports = PengeluaranZIS;
