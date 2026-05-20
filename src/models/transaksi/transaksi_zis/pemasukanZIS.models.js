const transaksi = require('../transaksi.models');

class PemasukanZIS extends transaksi {
    constructor(data) {
        super(data);
        this.muzakki_id = data.muzakki_id;
        this.kategori = data.kategori; // ENUM: 'zakat fitrah,zakat mal,shodaqoh,infaq'
        this.tanggal_penghimpunan = data.tanggal_penghimpunan;
        this.nama_muzakki = data.nama_muzakki ?? null; 
        this.created_at = new Date();
        this.updated_at = null;
        this.deleted_at = null;
        this.deleted_status = 0; 
    }   
}

module.exports = PemasukanZIS;