const User = require("../users.models");

class mustahik extends User {
  #nik;
  #tempat_lahir;
  #tanggal_lahir;
  #jenis_kelamin;
  #kategori;

  constructor(data) {
    super(data);
    this.#nik = data.nik ?? null;
    this.#tempat_lahir = data.tempat_lahir ?? null;
    this.#tanggal_lahir = data.tanggal_lahir ?? null;
    this.#jenis_kelamin = data.jenis_kelamin ?? null;
    this.#kategori = data.kategori ?? null;
  }

  get nik() {
    return this.#nik;
  }

  set nik(value) {
    this.#nik = value;
  }

  get tempat_lahir() {
    return this.#tempat_lahir;
  }

  set tempat_lahir(value) {
    this.#tempat_lahir = value;
  }

  get tanggal_lahir() {
    return this.#tanggal_lahir;
  }

  set tanggal_lahir(value) {
    this.#tanggal_lahir = value;
  }

  get jenis_kelamin() {
    return this.#jenis_kelamin;
  }

  set jenis_kelamin(value) {
    this.#jenis_kelamin = value;
  }

  get kategori() {
    return this.#kategori;
  }

  set kategori(value) {
    this.#kategori = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      nik: this.nik,
      tempat_lahir: this.tempat_lahir,
      tanggal_lahir: this.tanggal_lahir,
      jenis_kelamin: this.jenis_kelamin,
      kategori: this.kategori,
    };
  }
}

module.exports = mustahik;
