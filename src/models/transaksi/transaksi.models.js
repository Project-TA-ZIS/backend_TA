class transaksi {
  #id;
  #jumlah;
  #deskripsi;
  #created_at;
  #updated_at;

  constructor(data) {
    this.id = data.id ?? null;
    this.jumlah = data.jumlah ?? 0;
    this.deskripsi = data.deskripsi ?? null;
    this.created_at = data.created_at ?? null;
    this.updated_at = data.updated_at ?? null;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get jumlah() {
    return this.#jumlah;
  }

  set jumlah(value) {
    this.#jumlah = value;
  }

  get deskripsi() {
    return this.#deskripsi;
  }

  set deskripsi(value) {
    this.#deskripsi = value;
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

  toJSON() {
    return {
      id: this.id,
      jumlah: this.jumlah,
      deskripsi: this.deskripsi,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = transaksi;
