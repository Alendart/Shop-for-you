const {pool} = require("../utils/db");
const {v4: uuid} = require('uuid')
const {ValidationError} = require("../utils/error");
const {createHash} = require("../utils/hash");


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
        // TODO Weryfikacja czy login w bazie się nie powtarza.

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
        const [[result]] = await pool.execute('SELECT * FROM `accounts` WHERE `login` = :login',{
            login
        })
        if (result.pwd === pwd){
            console.log("Zalogowano poprawnie")
        }else{
            console.log("Hasło błędne")
        } //TODO tutaj należy dodać obsługę bcrypta
        return result.pwd === pwd ? result.id : null

    }

    async insert(){
        this.id = this.id ?? uuid()

        const pwd = await createHash(this.pwd)

        await pool.execute('INSERT INTO `accounts` VALUES(:id,:login,:pwd)',{
            id: this.id,
            login: this.login,
            pwd
        })
        console.log("Dodano!")
    }



}

module.exports = {
    AccountRecord,
}