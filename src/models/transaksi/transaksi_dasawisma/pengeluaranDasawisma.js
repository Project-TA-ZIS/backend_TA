const transaksi = require("../transaksi.models");

class PengeluaranDasawisma extends transaksi {
  #rw_id;
  #tanggal_penyaluran;
  #nama_anggota;

  constructor(data) {
    super(data);
    this.#rw_id = data.rw_id ?? null;
    this.#tanggal_penyaluran = data.tanggal_penyaluran;
    this.#nama_anggota = data.nama_anggota;
  }

  set rw_id(value) {
    this.#rw_id = value;
  }

  get rw_id() {
    return this.#rw_id;
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
      rw_id: this.rw_id,
      tanggal_penyaluran: this.tanggal_penyaluran,
      nama_anggota: this.nama_anggota,
    };
  }
}

module.exports = PengeluaranDasawisma;
