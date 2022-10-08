const {createPool} = require('mysql2');

const pool = createPool({
    database:'shop-o-nator',
    host: 'localhost',
    user: 'root',
    namedPlaceholders: true,
    decimalNumbers: true,

                              })

module.exports = {
    pool
}