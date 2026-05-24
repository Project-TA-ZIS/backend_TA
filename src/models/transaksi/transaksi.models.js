class transaksi {
  constructor(data) {
    this.id = data.id ?? null;
    this.jumlah = data.jumlah ?? 0;
    this.deskripsi = data.deskripsi ?? null;
    this.created_at = data.created_at ?? null;
    this.updated_at = data.updated_at ?? null;
  }
}

module.exports = transaksi;