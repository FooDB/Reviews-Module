const express = require('express');
const parser = require('body-parser');
const db = require('../database/db.js');

const app = express();

const port = process.env.PORT || 3005;

app.use(express.static('./public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/reviews/:id', (req, res) => {
    console.log('pull data request received params', req.params);
    db.pullFromDB((err, data) => {
        if (err) console.log(err);
        res.send(data);
    }, req.params.id)
})

app.set('port', port);
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`)
