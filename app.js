

var express = require('express'),
  config = require('./config/config');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://washington:poly@ds025772.mlab.com:25772/alphastoka');

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

