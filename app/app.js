'use strict';

var express = require('express');
var app = express();
var sort = require('./routes/sort');
var aggregate = require('./routes/aggregate');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/../public'));

// Use Jade for views
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Index page
app.get('/', function(req, res) {
  res.render('index');
});

// Sort route
app.post('/sort', sort);

// Aggregation route
app.post('/aggregate', aggregate);

module.exports = app;
