class User {
    constructor(data) {
        this.id = data.id ?? null;
        this.nama_lengkap = data.nama_lengkap ?? null;
        this.email = data.email ?? null;
        this.nomor_telpon = data.nomor_telpon ?? null;
        this.alamat = data.alamat ?? null;
    }
}

module.exports = User;