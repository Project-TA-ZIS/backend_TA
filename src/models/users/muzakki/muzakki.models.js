const User = require("../users.models");

class Muzakki extends User {
  constructor(data) {
    super(data);
    this.id = data.id ?? null;
    this.npwp = data.npwp ?? null;
    this.nik = data.nik ?? null;
    this.tempat_lahir = data.tempat_lahir ?? null;
    this.tanggal_lahir = data.tanggal_lahir ?? null;
    this.jenis_kelamin = data.jenis_kelamin ?? null;
    this.pekerjaan = data.pekerjaan ?? null;
    this.created_at = data.created_at ?? new Date();
    this.updated_at = data.updated_at ?? null;
    this.deleted_at = data.deleted_at ?? null;
    this.deleted_status = data.deleted_status ?? 0;
  }
}

module.exports = Muzakki;
