const User = require("../users.models");

class Muzakki extends User {
  #email;
  #npwp;
  #nik;
  #tempat_lahir;
  #tanggal_lahir;
  #jenis_kelamin;
  #pekerjaan;

  constructor(data) {
    super(data);
    this.#email = data.email ?? null;
    this.#npwp = data.npwp ?? null;
    this.#nik = data.nik ?? null;
    this.#tempat_lahir = data.tempat_lahir ?? null;
    this.#tanggal_lahir = data.tanggal_lahir ?? null;
    this.#jenis_kelamin = data.jenis_kelamin ?? null;
    this.#pekerjaan = data.pekerjaan ?? null;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get npwp() {
    return this.#npwp;
  }

  set npwp(value) {
    this.#npwp = value;
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

  toJSON() {
    return {
      ...super.toJSON(),
      email: this.#email,
      npwp: this.#npwp,
      nik: this.#nik,
      tempat_lahir: this.#tempat_lahir,
      tanggal_lahir: this.#tanggal_lahir,
      jenis_kelamin: this.#jenis_kelamin,
      pekerjaan: this.#pekerjaan,
    };
  }
}

module.exports = Muzakki;
