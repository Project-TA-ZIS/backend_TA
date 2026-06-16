class rw {
  #id;
  #nama_rw;
  #tipe_pengelolaan_kas;
  #created_at;
  #updated_at;
  #deleted_at;
  #deleted_status;

  constructor(data) {
    this.#id = data.id ?? null;
    this.#nama_rw = data.nama_rw ?? null;
    this.#tipe_pengelolaan_kas = data.tipe_pengelolaan_kas ?? null;
    this.#created_at = data.created_at ?? new Date();
    this.#updated_at = data.updated_at ?? new Date();
    this.#deleted_at = data.deleted_at ?? null;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get nama_rw() {
    return this.#nama_rw;
  }

  set nama_rw(value) {
    this.#nama_rw = value;
  }

  get tipe_pengelolaan_kas() {
    return this.#tipe_pengelolaan_kas;
  }

  set tipe_pengelolaan_kas(value) {
    this.#tipe_pengelolaan_kas = value;
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
      id: this.id,
      nama_rw: this.nama_rw,
      tipe_pengelolaan_kas: this.tipe_pengelolaan_kas,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      deleted_status: this.deleted_status,
    };
  }
}

module.exports = rw;