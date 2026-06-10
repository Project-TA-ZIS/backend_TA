class TotalKasZIS {
  #id;
  #jumlah_keseluruhan;
  #updated_at;

  constructor(data) {
    this.#id = data.id;
    this.#jumlah_keseluruhan = data.jumlah_keseluruhan;
    this.#updated_at = data.updated_at;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get jumlah_keseluruhan() {
    return this.#jumlah_keseluruhan;
  }

  set jumlah_keseluruhan(value) {
    this.#jumlah_keseluruhan = value;
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
      jumlah_keseluruhan: this.jumlah_keseluruhan,
      updated_at: this.updated_at,
    };
  }
}

module.exports = TotalKasZIS;
