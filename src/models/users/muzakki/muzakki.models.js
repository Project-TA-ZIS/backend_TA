class Muzakki {
    constructor(data) {
        this.id = data.id || null;
        super(data);
        this.npwp = data.npwp;
        this.nik = data.nik;
        this.tempat_lahir = data.tempat_lahir;
        this.tanggal_lahir = data.tanggal_lahir;
        this.jenis_kelamin = data.jenis_kelamin; 
        this.pekerjaan = data.pekerjaan;
        this.created_at = new Date();
        this.updated_at = null;
        this.deleted_at = null;
        this.deleted_status = 0;
    }
}

module.exports = Muzakki;
