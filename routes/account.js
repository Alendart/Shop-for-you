const express = require(`express`);
const {ValidationError} = require("../utils/error");
const {AccountRecord} = require("../records/account.record");
const {pool} = require("../utils/db");
const {createHash, compareHash} = require("../utils/hash");


const accountRouter = express.Router();

accountRouter
    .get('/',async (req, res) => {

        res.render('account/account');
    })
    .get('/create', (req, res) => {
        res.render('account/create')
    })
    .post('/login',async (req, res) => {
        const {login,pwd} = req.body
        console.log('Logowanie',{login,pwd})
        const data = await AccountRecord.verifyUser(login,pwd)
        console.log(data) // TODO Dokończyć obsługę logowania przy wykorzystaniu sprawdzenia hasha.
        // TODO Informacja o zalogowaniu powinna zostać wrzucona do ciasteczka sesyjnego lub kilkugodzinnego
        res.redirect('/account/')
    })
    .post('/create', async (req, res) => {
        const {login,pwd,pwd2} = req.body
        console.log('Tworzenie konta',{login,pwd,pwd2})
        if (pwd === pwd2){
            console.log('Hasło poprawne')
        } else {
            throw new ValidationError("Password and confirmed password should be same!")
        }

        const account = new AccountRecord({
            login,
            pwd
        })
        await account.insert()

        res.redirect('/account/create')
    })

module.exports = {
    accountRouter,
}