const transaksi = require("../transaksi.models");

class PemasukanZIS extends transaksi {
  #muzakki_id;
  #kategori;
  #tanggal_penghimpunan;
  #nama_muzakki;

  constructor(data) {
    super(data);
    this.#muzakki_id = data.muzakki_id;
    this.#kategori = data.kategori; // ENUM: 'zakat fitrah,zakat maal,shodaqoh,infaq'
    this.#tanggal_penghimpunan = data.tanggal_penghimpunan;
    this.#nama_muzakki = data.nama_muzakki ?? null;
  }

  get muzakki_id() {
    return this.#muzakki_id;
  }

  set muzakki_id(value) {
    this.#muzakki_id = value;
  }

  get kategori() {
    return this.#kategori;
  }

  set kategori(value) {
    this.#kategori = value;
  }

  get tanggal_penghimpunan() {
    return this.#tanggal_penghimpunan;
  }

  set tanggal_penghimpunan(value) {
    this.#tanggal_penghimpunan = value;
  }

  get nama_muzakki() {
    return this.#nama_muzakki;
  }

  set nama_muzakki(value) {
    this.#nama_muzakki = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      muzakki_id: this.muzakki_id,
      kategori: this.kategori,
      tanggal_penghimpunan: this.tanggal_penghimpunan,
      nama_muzakki: this.nama_muzakki,
    };
  }
}

module.exports = PemasukanZIS;
