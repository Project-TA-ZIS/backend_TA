class TotalKasDasawisma {
    constructor(data) {
        this.id = data.id;
        this.jumlah_keseluruhan = data.jumlah_keseluruhan;
        this.updated_at = new Date();
    }
}

module.exports = TotalKasDasawisma;