const transaksi = require("../transaksi.models");

class PengeluaranZIS extends transaksi {
  #mustahik_id;
  #kategori;
  #tanggal_penyaluran;
  #nama_mustahik;

  constructor(data) {
    super(data);
    this.#mustahik_id = data.mustahik_id ?? null;
    this.#kategori = data.kategori ?? null; // ENUM: zakat fitrah, zakat maal, shodaqoh, infaq
    this.#tanggal_penyaluran = data.tanggal_penyaluran;
    this.#nama_mustahik = data.nama_mustahik ?? null;
  }

  get mustahik_id() {
    return this.#mustahik_id;
  }

  set mustahik_id(value) {
    this.#mustahik_id = value;
  }

  get kategori() {
    return this.#kategori;
  }

  set kategori(value) {
    this.#kategori = value;
  }

  get tanggal_penyaluran() {
    return this.#tanggal_penyaluran;
  }

  set tanggal_penyaluran(value) {
    this.#tanggal_penyaluran = value;
  }

  get nama_mustahik() {
    return this.#nama_mustahik;
  }

  set nama_mustahik(value) {
    this.#nama_mustahik = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      mustahik_id: this.mustahik_id,
      kategori: this.kategori,
      tanggal_penyaluran: this.tanggal_penyaluran,
      nama_mustahik: this.nama_mustahik,
    };
  }
}

module.exports = PengeluaranZIS;
