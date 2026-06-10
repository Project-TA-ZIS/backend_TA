const User = require("../users.models");

class Amil extends User {
  #email;
  #password;
  #roles;

  constructor(data) {
    super(data);
    this.#email = data.email ?? null;
    this.#password = data.password ?? null;
    this.#roles = data.roles ?? "amil zakat";
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

  get roles() {
    return this.#roles;
  }

  set roles(value) {
    this.#roles = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      email: this.#email,
      password: this.#password,
      roles: this.#roles,
    };
  }
}

module.exports = Amil;
