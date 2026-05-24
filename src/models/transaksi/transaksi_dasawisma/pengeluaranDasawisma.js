
const transaksi = require("../transaksi.models");

class PengeluaranDasawisma extends transaksi {
  constructor(data) {
    super(data);
    this.tanggal_penyaluran = data.tanggal_penyaluran;
  }
}

module.exports = PengeluaranDasawisma;
