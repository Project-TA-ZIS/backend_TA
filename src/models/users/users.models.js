class User {
    constructor(data) {
        this.nama_lengkap = data.nama_lengkap;
        this.email = data.email;
        this.nomor_telpon = data.nomor_telpon;
        this.alamat = data.alamat;
    }
}

module.exports = User;