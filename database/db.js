require('dotenv').config()
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

const pullFromDB = (cb, id) => {
    con.query(`SELECT * FROM REVIEWS WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${id});`, (err, data) => {
        if (err) console.log(err, 'err');
        console.log(data);
        cb(null, data)
    })
}

module.exports = {
    pullFromDB,
    con
}
