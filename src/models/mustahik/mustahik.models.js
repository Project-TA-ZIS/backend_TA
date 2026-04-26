class mustahik {
  constructor(data) {
    this.id = data.id || null;
    this.nama_lengkap = data.nama_lengkap;
    this.nomor_telpon = data.nomor_telpon;
    this.alamat = data.alamat;
    this.nik = data.nik;
    this.tempat_lahir = data.tempat_lahir;
    this.tanggal_lahir = data.tanggal_lahir;
    this.jenis_kelamin = data.jenis_kelamin;
    this.kategori = data.kategori; // ENUM: fakir, miskin, amil, mualaf, berhutang, fisabilillah, musafir
    this.created_at = new Date();
    this.updated_at = null;
    this.deleted_at = null;
    this.deleted_status = 0;
  }
}

module.exports = mustahik;
