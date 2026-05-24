const User = require('../users.models');

class Dasawisma extends User {
    constructor(data) {
        super(data);
        this.email = data.email ?? null;
        this.password = data.password ?? null;
        this.nik = data.nik ?? null;
        this.roles = data.roles ?? null; 
        this.tempat_lahir = data.tempat_lahir ?? null;
        this.tanggal_lahir = data.tanggal_lahir ?? null;
    }
}

module.exports = Dasawisma;