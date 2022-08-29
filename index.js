const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');


const app = express();

app
    .use(express.static('public'))
    .use(cookieParser());

app
    .engine('.hbs',hbs.engine({
        extname:'.hbs',
                             }))
    .set('view engine', 'hbs')
    .set('views', './views');

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000);