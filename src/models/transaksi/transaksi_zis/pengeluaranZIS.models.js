const transaksi = require('../transaksi.models');

class PengeluaranZIS extends transaksi {
    constructor(data) {
        super(data);
        this.mustahiq_id = data.mustahiq_id;
        this.kategori = data.kategori; // ENUM: zakat fitrah, zakat mal, shodaqoh, infaq
        this.tanggal_penyaluran = data.tanggal_penyaluran;
        this.created_at = new Date();
        this.updated_at = null;
        this.deleted_at = null;
        this.deleted_status = 0; 
    }   
}

module.exports = PengeluaranZIS;