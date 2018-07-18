const express = require('express');
const parser = require('body-parser');
const db = require('../databse/dataGenerator.js');

const app = express();

const port = process.env.PORT || 3005;

app.use(express.static('./public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/insertData', (req, res) => {
    db.inserRestaurantData()
    console.log('get request received');
    res.send('all good');
})


app.set('port', port);
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`)
