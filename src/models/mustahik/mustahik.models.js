class mustahik {
  constructor(data) {
    this.id = data.id ?? null;
    this.nama_lengkap = data.nama_lengkap ?? null;
    this.nomor_telpon = data.nomor_telpon ?? null;
    this.alamat = data.alamat ?? null;
    this.nik = data.nik ?? null;
    this.tempat_lahir = data.tempat_lahir ?? null;
    this.tanggal_lahir = data.tanggal_lahir ?? null;
    this.jenis_kelamin = data.jenis_kelamin ?? null;
    this.kategori = data.kategori ?? null; // ENUM: fakir, miskin, amil, mualaf, berhutang, fisabilillah, musafir
    this.created_at = data.created_at ?? new Date();
    this.updated_at = data.updated_at ?? null;
    this.deleted_at = data.deleted_at ?? null;
    this.deleted_status = data.deleted_status ?? 0;
  }
}

module.exports = mustahik;
