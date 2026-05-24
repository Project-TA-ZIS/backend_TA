class User {
  constructor(data) {
    this.id = data.id ?? null;
    this.nomor_telpon = data.nomor_telpon ?? null;
    this.alamat = data.alamat ?? null;
    this.nama_lengkap = data.nama_lengkap ?? null;
    this.created_at = data.created_at ?? null;
    this.updated_at = data.updated_at ?? null;
    this.deleted_at = data.deleted_at ?? null;
    this.deleted_status = data.deleted_status ?? 0;
  }
}

module.exports = User;
