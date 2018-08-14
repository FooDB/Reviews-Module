const express = require('express');
const parser = require('body-parser');
const db = require('../database/db.js');
const path = require('path');

const app = express();

const port = process.env.PORT || 3027;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
  next();
});

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/bundle.js'));
});

app.get('*/api/restaurant/:id/reviews', (req, res) => {
  if (req.params.id < 100 && req.params.id > 0) {
    console.log(req, req.params.id);
    db.pullFromDB(`SELECT * FROM Reviews WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
      if (err) res.status(400).send('error');
      res.send(data);
    });
  } else {
    res.send('Undefined ID');
  }
});
app.get('*/api/restaurant/:id/filterKeywords', (req, res) => {
  if (req.params.id < 100 && req.params.id > 0) {
    db.pullFromDB(`SELECT * FROM Filters WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
      if (err) res.status(400).send('error');
      res.send(data);
    });
  } else {
    res.send('Undefined ID');
  }
});
app.get('*/api/restaurant/:id/lovedFor', (req, res) => {
  if (req.params.id < 100 && req.params.id > 0) {
    db.pullFromDB(`SELECT * FROM LovedFor WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${req.params.id});`, (err, data) => {
      if (err) res.status(400).send('error');
      res.send(data);
    });
  } else {
    res.send('Undefined ID');
  }
});
app.get('*/api/restaurant/:id/info', (req, res) => {
  if (req.params.id < 100 && req.params.id > 0) {
    db.pullFromDB(`SELECT * FROM Restaurant WHERE id = ${req.params.id};`, (err, data) => {
      if (err) res.status(400).send('error');
      res.send(data);
    });
  } else {
    res.send('Undefined ID');
  }
});
app.post('*/api/restaurant/:id/helpfulEvent', (req, res) => {
  console.log('helpful post received', req.params);
  db.postToDB(`UPDATE Reviews SET is_helpful = is_helpful + 1 WHERE id = ${req.params.id};`, (err, result) => {
    if (err) res.status(400).send('error');
    res.send(result);
  });
});

app.post('*/api/restaurant/add/:name/:area', (req, res) => {
  db.postToDB(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES("${req.params.name}", "${req.params.area}");`, (err, result) => {
    if (err) res.status(400).send('error');
    res.send(result);
  });
});

app.post('*/api/restaurant/:id/remove', (req, res) => {
  db.postToDB(`DELETE FROM Restaurant WHERE id='${req.params.id}';`, (err, result) => {
    if (err) res.status(400).send('error');
    res.send(result);
  });
});

app.use('/', express.static('./public'));
app.use('/restaurant/:id', express.static('./public'));

app.set('port', port);
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
