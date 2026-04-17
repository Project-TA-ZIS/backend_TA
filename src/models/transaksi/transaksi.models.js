class transaksi {
    constructor(data) {
        this.jumlah = data.jumlah;
        this.deskripsi = data.deskripsi;
        this.tanggal = data.tanggal;
    }
}

module.exports = transaksi;