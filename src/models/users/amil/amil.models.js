const User = require('../users.models');

class Amil extends User {
    constructor(data) {
        super(data);
        this.email = data.email ?? null;
        this.password = data.password ?? null;
        this.roles = data.roles ?? "amil zakat";
    }
}

module.exports = Amil;