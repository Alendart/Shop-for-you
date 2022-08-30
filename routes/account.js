const express = require(`express`);


const accountRouter = express.Router();

accountRouter
    .get('/',(req, res) => {
        res.render('account/account');
    })
    .get('/create', (req, res) => {
        res.render('account/create')
    })

module.exports = {
    accountRouter,
}