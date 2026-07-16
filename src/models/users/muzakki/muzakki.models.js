const User = require("../users.models");

class Muzakki extends User {
  #email;
  #nik;
  #tempat_lahir;
  #tanggal_lahir;
  #jenis_kelamin;
  #pekerjaan;
  #status_pernikahan;

  constructor(data) {
    super(data);
    this.#email = data.email ?? null;
    this.#nik = data.nik ?? null;
    this.#tempat_lahir = data.tempat_lahir ?? null;
    this.#tanggal_lahir = data.tanggal_lahir ?? null;
    this.#jenis_kelamin = data.jenis_kelamin ?? null;
    this.#pekerjaan = data.pekerjaan ?? null;
    this.#status_pernikahan = data.status_pernikahan ?? null;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
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

  get pekerjaan() {
    return this.#pekerjaan;
  }

  set pekerjaan(value) {
    this.#pekerjaan = value;
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
      email: this.#email,
      nik: this.#nik,
      tempat_lahir: this.#tempat_lahir,
      tanggal_lahir: this.#tanggal_lahir,
      jenis_kelamin: this.#jenis_kelamin,
      pekerjaan: this.#pekerjaan,
      status_pernikahan: this.#status_pernikahan,
    };
  }
}

module.exports = Muzakki;
