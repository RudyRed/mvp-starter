var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/pokemon', function(req, res) {
  items.selectAll('pokemon', '', function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/moves', function(req, res) {
  console.log('req', req.query)
  items.selectPokemonsMoves(req.query.id, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
