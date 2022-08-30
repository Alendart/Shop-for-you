const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const {catalogueRouter} = require("./routes/catalogue");
const {accountRouter} = require("./routes/account");
const {basketRouter} = require("./routes/basket");


const app = express();

app
    .use(express.static('public'))
    .use(cookieParser())
    .use(express.urlencoded({
        extended:true,
                            }))
    .use(methodOverride(`_method`));

app
    .engine('.hbs',hbs.engine({
        extname:'.hbs',
                             }))
    .set('view engine', 'hbs')
    .set('views', './views');

app
    .use('/', catalogueRouter)
    .use('/account',accountRouter)
    .use('/basket', basketRouter)


app.listen(3000);