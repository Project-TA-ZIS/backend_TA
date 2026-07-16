const User = require("../users.models");

class mustahik extends User {
  #nik;
  #tempat_lahir;
  #tanggal_lahir;
  #jenis_kelamin;
  #kategori;
  #status_pekerjaan;
  #pekerjaan;
  #penghasilan;
  #status_pernikahan;

  constructor(data) {
    super(data);
    this.#nik = data.nik ?? null;
    this.#tempat_lahir = data.tempat_lahir ?? null;
    this.#tanggal_lahir = data.tanggal_lahir ?? null;
    this.#jenis_kelamin = data.jenis_kelamin ?? null;
    this.#kategori = data.kategori ?? null;
    this.#status_pekerjaan = data.status_pekerjaan ?? null;
    this.#pekerjaan = data.pekerjaan ?? null;
    this.#penghasilan = data.penghasilan ?? null;
    this.#status_pernikahan = data.status_pernikahan ?? null;
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

  get status_pekerjaan() {
    return this.#status_pekerjaan;
  }

  set status_pekerjaan(value) {
    this.#status_pekerjaan = value;
  }

  get pekerjaan() {
    return this.#pekerjaan;
  }

  set pekerjaan(value) {
    this.#pekerjaan = value;
  }

  get penghasilan() {
    return this.#penghasilan;
  }

  set penghasilan(value) {
    this.#penghasilan = value;
  }

  get status_pernikahan() {
    return this.#status_pernikahan;
  }

  set status_pernikahan(value) {
    this.#status_pernikahan = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      nik: this.nik,
      tempat_lahir: this.tempat_lahir,
      tanggal_lahir: this.tanggal_lahir,
      jenis_kelamin: this.jenis_kelamin,
      kategori: this.kategori,
      status_pekerjaan: this.status_pekerjaan,
      pekerjaan: this.pekerjaan,
      penghasilan: this.penghasilan,
      status_pernikahan: this.status_pernikahan,
    };
  }
}

module.exports = mustahik;
