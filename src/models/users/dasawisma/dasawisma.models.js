const User = require("../users.models");

class Dasawisma extends User {
  #email;
  #password;
  #nik;
  #roles;
  #tempat_lahir;
  #tanggal_lahir;

  constructor(data) {
    super(data);
    this.#email = data.email ?? null;
    this.#password = data.password ?? null;
    this.#nik = data.nik ?? null;
    this.#roles = data.roles ?? null;
    this.#tempat_lahir = data.tempat_lahir ?? null;
    this.#tanggal_lahir = data.tanggal_lahir ?? null;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    this.#password = value;
  }

  get nik() {
    return this.#nik;
  }

  set nik(value) {
    this.#nik = value;
  }

  get roles() {
    return this.#roles;
  }

  set roles(value) {
    this.#roles = value;
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

  toJSON() {
    return {
      ...super.toJSON(),
      email: this.#email,
      password: this.#password,
      nik: this.#nik,
      roles: this.#roles,
      tempat_lahir: this.#tempat_lahir,
      tanggal_lahir: this.#tanggal_lahir,
    };
  }
}

module.exports = Dasawisma;
