var express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile');

module.exports = function (app) {
  app.use('/deck', router);
};

router.get('/', function (req, res, next) {
    var filter = req.query.filter || {};
    var profiles = Profile.find(filter).sort({ follower_count : -1 }).skip(0).limit(1000).exec(function(err, profiles){
      res.render('index', {
        title: 'Deck',
        profiles: profiles
      });
    });

});
