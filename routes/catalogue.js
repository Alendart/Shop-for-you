const express = require(`express`);


const catalogueRouter = express.Router();

catalogueRouter
    .get('/',(req, res) => {
        res.render('home');
    })
    .get('/full', (req, res) => {
        res.render('catalogue/all-list')
    })


module.exports = {
    catalogueRouter,
}