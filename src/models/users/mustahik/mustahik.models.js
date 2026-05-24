const User = require('../users.models');

class mustahik extends User {
  constructor(data) {
    super(data);
    this.nik = data.nik ?? null;
    this.tempat_lahir = data.tempat_lahir ?? null;
    this.tanggal_lahir = data.tanggal_lahir ?? null;
    this.jenis_kelamin = data.jenis_kelamin ?? null;
    this.kategori = data.kategori ?? null;
  }
}

module.exports = mustahik;
