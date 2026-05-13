const User = require('../users.models');

class Amil extends User {
    constructor(data) {
        super(data);
        this.password = data.password ?? null;
        this.roles = data.roles ?? "amil zakat";
        this.created_at =  data.created_at ?? new Date();
        this.updated_at = data.updated_at ?? null;
        this.deleted_at = data.deleted_at ?? null;
        this.deleted_status = data.deleted_status ?? 0;
    }
}

module.exports = Amil;