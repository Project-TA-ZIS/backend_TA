const transaksi = require("../transaksi.models");
class PemasukanDasawisma extends transaksi {
  constructor(data) {
    super(data);
    this.tanggal_penghimpunan = data.tanggal_penghimpunan ?? null;
    this.anggota_dasawisma_id = data.anggota_dasawisma_id ?? null;
    this.sumber = data.sumber ?? null;
    this.nama_anggota = data.nama_anggota ?? null;
  }
}

module.exports = PemasukanDasawisma;
