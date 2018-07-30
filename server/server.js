const express = require('express');
const parser = require('body-parser');
const db = require('../database/db.js');

const app = express();

const port = process.env.PORT || 3005;

app.use('/', express.static('./public'));
app.use('/restaurant/:id', express.static('./public'))
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/restaurant/:id/reviews', (req, res) => {
  db.pullFromDB(`SELECT * FROM Reviews WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
    if (err) res.status(400).send('error');
    res.send(data);
  });
});
app.get('/restaurant/:id/filterKeywords', (req, res) => {
  db.pullFromDB(`SELECT * FROM Filters WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
    if (err) res.status(400).send('error');
    res.send(data);
  });
});
app.get('/restaurant/:id/LovedFor', (req, res) => {
  db.pullFromDB(`SELECT * FROM LovedFor WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
    if (err) res.status(400).send('error');
    res.send(data);
  });
});
app.get('/restaurant/:id/info', (req, res) => {
  db.pullFromDB(`SELECT * FROM Restaurant WHERE id = ${req.params.id};`, (err, data) => {
    if (err) res.status(400).send('error');
    res.send(data);
  });
});
app.post('/restaurant/:is_helpful/id/:id/helpfulEvent', (req, res) => {
  console.log('helpful post received', req.params);
  db.postToDB(`UPDATE Reviews SET is_helpful = ${req.params.is_helpful} WHERE id = ${req.params.id};`, (err, result) => {
    if (err) res.status(400).send('error');
    res.send(result);
  });
});

app.set('port', port);
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
