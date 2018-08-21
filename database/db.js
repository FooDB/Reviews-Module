// uncomment for Docker deployment
// require('dotenv').config();

const { Pool } = require('pg');

const config = {
    host: 'localhost',
    user: 'app',     
    password: 'password',
    database: 'reviews',
    port: 5432
};

var db = new Pool(config);
//var pgp;

//db.connect();
// uncomment this for Docker deployment (and comment out lines 13-18)
// const con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
// });

const query = (query, cb) => {
  db.query(query, (err, data) => {
    if (err) throw error;
    cb(null, data);
  });
};

module.exports = {
  db,
  query,
};
