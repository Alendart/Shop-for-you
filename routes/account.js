const express = require(`express`);
const {ValidationError} = require("../utils/error");
const {AccountRecord} = require("../records/account.record");
const {pool} = require("../utils/db");


const accountRouter = express.Router();

accountRouter
    .get('/',async (req, res) => {
        const data = await pool.execute('SELECT * FROM `accounts`')
        console.log(data)
        res.render('account/account');
    })
    .get('/create', (req, res) => {
        res.render('account/create')
    })
    .post('/login',async (req, res) => {
        const {login,pwd} = req.body
        console.log('Logowanie',{login,pwd})
        const data = await AccountRecord.verifyUser(login,pwd)
        console.log(data)
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