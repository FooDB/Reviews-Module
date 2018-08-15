// uncomment for Docker deployment
// require('dotenv').config();
const mysql = require('mysql');

// uncomment this for Docker deployment (and comment out lines 13-18)
// const con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
// });

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews',
});

const pullFromDB = (query, cb) => {
  con.query(query, (err, data) => {
    if (err) console.log(err, 'err');
    cb(null, data);
  });
};
const postToDB = (query, cb) => {
  con.query(query, (err, result) => {
    if (err) console.log(err);
    cb(null, result);
  });
};

module.exports = {
  pullFromDB,
  con,
  postToDB,
};
