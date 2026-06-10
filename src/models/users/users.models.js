class User {
  #id;
  #nomor_telpon;
  #alamat;
  #nama_lengkap;
  #created_at;
  #updated_at;
  #deleted_at;
  #deleted_status;

  constructor(data) {
    this.#id = data.id ?? null;
    this.#nomor_telpon = data.nomor_telpon ?? null;
    this.#alamat = data.alamat ?? null;
    this.#nama_lengkap = data.nama_lengkap ?? null;
    this.#created_at = data.created_at ?? null;
    this.#updated_at = data.updated_at ?? null;
    this.#deleted_at = data.deleted_at ?? null;
    this.#deleted_status = data.deleted_status ?? 0;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get nomor_telpon() {
    return this.#nomor_telpon;
  }

  set nomor_telpon(value) {
    this.#nomor_telpon = value;
  }

  get alamat() {
    return this.#alamat;
  }

  set alamat(value) {
    this.#alamat = value;
  }

  get nama_lengkap() {
    return this.#nama_lengkap;
  }

  set nama_lengkap(value) {
    this.#nama_lengkap = value;
  }

  get created_at() {
    return this.#created_at;
  }

  set created_at(value) {
    this.#created_at = value;
  }

  get updated_at() {
    return this.#updated_at;
  }

  set updated_at(value) {
    this.#updated_at = value;
  }

  get deleted_at() {
    return this.#deleted_at;
  }

  set deleted_at(value) {
    this.#deleted_at = value;
  }

  get deleted_status() {
    return this.#deleted_status;
  }

  set deleted_status(value) {
    this.#deleted_status = value;
  }

  toJSON() {
    return {
      id: this.#id,
      nomor_telpon: this.#nomor_telpon,
      alamat: this.#alamat,
      nama_lengkap: this.#nama_lengkap,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
      deleted_at: this.#deleted_at,
      deleted_status: this.#deleted_status,
    };
  }
}

module.exports = User;
