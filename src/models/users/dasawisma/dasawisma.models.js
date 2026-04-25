const User = require('../users.models');

class Dasawisma extends User {
    constructor(data) {
        super(data);
        this.id = data.id || null;
        this.password = data.password;
        this.nik = data.nik;
        this.role = 'anggota'; 
        this.tempat_lahir = data.tempat_lahir;
        this.tanggal_lahir = data.tanggal_lahir;
        this.created_at =  new Date();
        this.updated_at = null;
        this.deleted_at = null;
        this.deleted_status = 0;
    }
}

module.exports = Dasawisma;