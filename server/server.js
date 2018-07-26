const express = require('express');
const parser = require('body-parser');
const db = require('../database/db.js');

const app = express();

const port = process.env.PORT || 3005;

app.use(express.static('./public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/reviews/:id', (req, res) => {
  db.pullFromDB(`SELECT * FROM Reviews WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});
app.get('/filterKeywords/:id', (req, res) => {
  db.pullFromDB(`SELECT * FROM Filters WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});
app.get('/LovedFor/:id', (req, res) => {
  db.pullFromDB(`SELECT * FROM LovedFor WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});
app.get('/restaurantInfo/:id', (req, res) => {
  db.pullFromDB(`SELECT * FROM restaurant WHERE id = ${req.params.id};`, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});
app.post('/helpfulEvent/:is_helpful/id/:id', (req, res) => {
  console.log('helpful post received', req.params);
  db.postToDB(`UPDATE Reviews SET is_helpful = ${req.params.is_helpful} WHERE id = ${req.params.id};`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.set('port', port);
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
