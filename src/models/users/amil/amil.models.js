const User = require('../users.models');

class Amil extends User {
    constructor(data) {
        super(data);
        this.id = data.id || null;
        this.password = data.password;
        this.roles = 'amil zakat'; 
        this.created_at =  new Date();
        this.updated_at = null;
        this.deleted_at = null;
        this.deleted_status = 0;
    }
}

module.exports = Amil;