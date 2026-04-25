class totalZIS   {
    constructor(data) {
        this.id = data.id;
        this.jumlah_keseluruhan = data.jumlah_keseluruhan;
        this.kategori = data.kategori; // ENUM: zakat fitrah, zakat mal, shodaqoh, infaq
        this.updated_at = new Date();
    }
}

module.exports = totalZIS;