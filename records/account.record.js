const {pool} = require("../utils/db");


class AccountRecord {
    constructor(obj) {
        this.id = obj.id;
        this.login = obj.login;
        this.pwd = obj.pwd;
    }

    _checkLogin(){

    }

    _checkPwd(){

    }

    async insert(){

    }
}