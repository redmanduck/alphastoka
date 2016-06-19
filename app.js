

var express = require('express'),
  config = require('./config/config');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alphastoka');

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

