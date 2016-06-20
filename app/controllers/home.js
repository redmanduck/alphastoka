var express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
      res.render('landing', {
        layout: 'landing',
        title: 'Welcome'
      });

});
