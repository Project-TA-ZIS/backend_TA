const transaksi = require("../transaksi.models");

class PengeluaranDasawisma extends transaksi {
  #tanggal_penyaluran;
  #nama_anggota;

  constructor(data) {
    super(data);
    this.#tanggal_penyaluran = data.tanggal_penyaluran;
    this.#nama_anggota = data.nama_anggota;
  }

  get tanggal_penyaluran() {
    return this.#tanggal_penyaluran;
  }

  set tanggal_penyaluran(value) {
    this.#tanggal_penyaluran = value;
  }

  get nama_anggota() {
    return this.#nama_anggota;
  }

  set nama_anggota(value) {
    this.#nama_anggota = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tanggal_penyaluran: this.tanggal_penyaluran,
      nama_anggota: this.nama_anggota,
    };
  }
}

module.exports = PengeluaranDasawisma;
