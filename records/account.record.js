const {pool} = require("../utils/db");
const {v4: uuid} = require('uuid')
const {ValidationError} = require("../utils/error");


class AccountRecord {
    constructor(obj) {
        this.id = obj.id;
        this.login = obj.login;
        this.pwd = obj.pwd;


        this._checkLogin()
        this._checkPwd()
    }

    _checkLogin(){
        if (this.login.trim().length !== this.login.length){
            throw new ValidationError("Login can't contain space");
        }
        // if (this.login.trim().contains(" ")){
        //     throw new ValidationError("Login can't contain space");
        // } TODO Wymyślić sposób na sprawdzenie czy hasło zawiera spacje. Może pocięcie stringa na tablicę i sprawdzenie każdego znaku z osobna
        if (this.login.length < 5){
            throw new ValidationError('Login should contain at least 5 characters')
        }
        if (this.login.length > 15){
            throw new ValidationError("Login shouldn't be longer than 15 characters")
        }

    }

    _checkPwd(){
        if (this.pwd.length < 5){
            throw new ValidationError('Password should contain at least 5 characters')
        }
        if (this.pwd.length > 20){
            throw new ValidationError("Password shouldn't be longer than 20 characters")
        }
        // if (this.pwd.trim().contains(" ")){
        //     throw new ValidationError("Password can't contain space");
        // } TODO Wymyślić sposób na sprawdzenie czy hasło zawiera spacje. Może pocięcie stringa na tablicę i sprawdzenie każdego znaku z osobna
    }

    _checkId(id){
        this.id = id ?? undefined
        if(this.id === undefined){
            throw new ValidationError("We don't have such user in our database")
        }
    }

    static async findOne(id){
        if(id === undefined || id === ""){
            throw new ValidationError("User id was incorrect!")
        }
        const result = await pool.execute('SELECT * FROM `accounts` WHERE `id` = :id',{
            id
        })
        console.log(result)

    }

    static async verifyUser(login,pwd){
        const result = await pool.execute('SELECT * FROM `accounts`')
        // TODO Nie jestem wstanie pobrać danych z MySQL - nie mam pojęcia dlaczego
        return result
        // TODO Dodać obsługę bcrypta i hashowanie i porównywanie danych
    }

    async insert(){
        this.id = this.id ?? uuid()
        await pool.execute('INSERT INTO `accounts` VALUES(:id,:login,:pwd)',{
            id: this.id,
            login: this.login,
            pwd: this.pwd
        })
        console.log("Dodano!")
    }


}

module.exports = {
    AccountRecord,
}