var express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    var profiles = Profile.find({}).sort({ follower_count : -1 }).exec(function(err, profiles){
      res.render('index', {
        title: 'Cards',
        profiles: profiles
      });
    });

});
