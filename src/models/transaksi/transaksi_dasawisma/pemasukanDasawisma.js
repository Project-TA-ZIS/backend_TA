const transaksi = require("../transaksi.models");
class PemasukanDasawisma extends transaksi {
  #tanggal_penghimpunan;
  #anggota_dasawisma_id;
  #sumber;
  #nama_anggota;

  constructor(data) {
    super(data);
    this.#tanggal_penghimpunan = data.tanggal_penghimpunan ?? null;
    this.#anggota_dasawisma_id = data.anggota_dasawisma_id ?? null;
    this.#sumber = data.sumber ?? null;
    this.#nama_anggota = data.nama_anggota ?? null;
  }

  get tanggal_penghimpunan() {
    return this.#tanggal_penghimpunan;
  }

  set tanggal_penghimpunan(value) {
    this.#tanggal_penghimpunan = value;
  }

  get anggota_dasawisma_id() {
    return this.#anggota_dasawisma_id;
  }

  set anggota_dasawisma_id(value) {
    this.#anggota_dasawisma_id = value;
  }

  get sumber() {
    return this.#sumber;
  }

  set sumber(value) {
    this.#sumber = value;
  }

  get nama_anggota() {
    return this.#nama_anggota;
  }

  set nama_anggota(value) {
    this.#nama_anggota = value;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tanggal_penghimpunan: this.tanggal_penghimpunan,
      anggota_dasawisma_id: this.anggota_dasawisma_id,
      sumber: this.sumber,
      nama_anggota: this.nama_anggota,
    };
  }
}

module.exports = PemasukanDasawisma;
