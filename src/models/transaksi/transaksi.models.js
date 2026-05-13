class transaksi {
  constructor(data) {
    this.id = data.id ?? null;
    this.jumlah = data.jumlah ?? 0;
    this.deskripsi = data.deskripsi ?? null;
    // this.tanggal = data.tanggal;
  }
}

module.exports = transaksi;