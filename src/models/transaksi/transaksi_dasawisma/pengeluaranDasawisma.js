
const transaksi = require("../transaksi.models");

class PengeluaranDasawisma extends transaksi {
  constructor(data) {
    super(data);
    this.tanggal_penyaluran = data.tanggal_penyaluran;
    this.created_at = data.created_at ?? new Date();
    this.updated_at = data.updated_at ?? null;
    this.deleted_at = data.deleted_at ?? null;
    this.deleted_status = data.deleted_status ?? 0;
  }
}

module.exports = PengeluaranDasawisma;
