const express = require(`express`);


const basketRouter = express.Router();

basketRouter
    .get('/', (req, res) => {
        res.render('basket/basket')
    });


module.exports = {
    basketRouter,
}