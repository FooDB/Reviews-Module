require('newrelic');
const express = require('express');
const parser = require('body-parser');
const db = require('../database/db.js');
const path = require('path');
const cors = require('cors');
const compression = require('compression')
const redis = require('redis');
const responseTime = require('response-time');
const cluster = require('cluster');
const http = require('http2');
const numCPUs = require('os').cpus().length;

const client = redis.createClient();

const app = express();

app.use(compression());
app.use(responseTime());

const port = process.env.PORT || 3027;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
   cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {

console.log(`Worker ${process.pid} started`);

app.get('/loaderio-fa3e56139d2f3f4d8b9111ad8738f265/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/loaderio-fa3e56139d2f3f4d8b9111ad8738f265.txt'));
})

app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/bundle.js'));
});

const getReviews = (req, res) => {
  if (req.params.id < 10000000 && req.params.id > 0) {
    db.query(`SELECT * FROM Reviews WHERE rest_id = ${req.params.id};`, (err, data) => {
      if (err) res.status(400).send('error');
      let cache = '';
      if (data.rows.length) {
        cache = JSON.stringify(data.rows)
      }
      res.send(data.rows);
      let id = req.params.id + 0;
      client.set(id, cache);
      });
  } else {
    res.send('Undefined ID');
  }
};

const getCacheReviews = (req, res) => {
  client.get(req.params.id + 0, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getReviews(req, res);
    }
  });
}

app.get('*/api/restaurant/:id/reviews', getCacheReviews);

const getFilters = (req, res) => {
  if (req.params.id < 10000000 && req.params.id > 0) {
    db.query(`SELECT * FROM Filters WHERE rest_id = ${req.params.id};`, (err, data) => {
      if (err) res.status(400).send('error');
      let cache = '';
      if (data.rows.length) {
        cache = JSON.stringify(data.rows)
      }
      res.send(data.rows);
      let id=req.params.id + 1;
      client.set(id, cache);
      });
  } else {
    res.send('Undefined ID');
  }
};

const getCacheFilters = (req, res) => {
  client.get(req.params.id + 1, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getFilters(req, res);
    }
  });
}

app.get('*/api/restaurant/:id/filterKeywords', getCacheFilters);

const getItems = (req, res) => {
  if (req.params.id < 10000000 && req.params.id > 0) {
    db.query(`SELECT * FROM LovedFor WHERE rest_id = ${req.params.id};`, (err, data) => {
      if (err) res.status(400).send('error');
      let cache = '';
      if (data.rows.length) {
        cache = JSON.stringify(data.rows)
      }
      res.send(data.rows);
      let id=req.params.id + 2;
      client.set(id, cache);
      });
  } else {
    res.send('Undefined ID');
  }
};

const getCacheItems = (req, res) => {
  client.get(req.params.id + 2, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getItems(req, res);
    }
  });
}

app.get('*/api/restaurant/:id/lovedFor', getItems);

const getInfo = (req, res) => {
  if (req.params.id < 10000000 && req.params.id > 0) {
    db.query(`SELECT * FROM Restaurant WHERE id = ${req.params.id};`, (err, data) => {
      if (err) res.status(400).send('error');
      let cache = '';
      if (data.rows.length) {
        cache = JSON.stringify(data.rows)
      }
      res.send(data.rows);
      let id=req.params.id + 3;
      client.set(id, cache);
      });
  } else {
    res.send('Undefined ID');
  }
};

const getCacheInfo = (req, res) => {
  client.get(req.params.id + 3, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getInfo(req, res);
    }
  });
}

app.get('*/api/restaurant/:id/info', getCacheInfo);

app.post('*/api/restaurant/:id/helpfulEvent', (req, res) => {
  db.query(`UPDATE Reviews SET is_helpful = is_helpful + 1 WHERE id = ${req.params.id};`, (err, result) => {
    if (err) res.status(400).send('error');
    res.status(201);
    res.send(result);
  });
});
//
//app.post('*/api/restaurant/add/:name/:area', (req, res) => {
//  db.query(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES("${req.params.name}", "${req.params.area}");`, (err, result) => {
//    if (err) res.status(400).send('error');
//    res.status(201);
//    res.send(result);
//  });
//});
//
//app.post('*/api/restaurant/:id/remove', (req, res) => {
//  db.query(`DELETE FROM Restaurant WHERE id='${req.params.id}';`, (err, result) => {
//    if (err) res.status(400).send('error');
//    res.status(201);
//    res.send(result);
//  });
//});
//
app.use('*/*', express.static('./public'));

app.set('port', port);
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
}
