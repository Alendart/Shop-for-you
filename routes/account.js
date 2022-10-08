const express = require(`express`);


const accountRouter = express.Router();

accountRouter
    .get('/',(req, res) => {
        res.render('account/account');
    })
    .get('/create', (req, res) => {
        res.render('account/create')
    })
    .post('/login',(req, res) => {
        const {login,pwd} = req.body
        console.log('Logowanie',{login,pwd})

        res.redirect('/')
    })
    .post('/create', (req, res) => {
        const {login,pwd,pwd2} = req.body
        console.log('Tworzenie konta',{login,pwd,pwd2})

        res.redirect('/')
    })

module.exports = {
    accountRouter,
}