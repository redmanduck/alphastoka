var express = require('express'),
  router = express.Router(),
  Profile = require('../models/profile');

module.exports = function (app) {
  app.use('/deck', router);
};

router.get('/', function (req, res, next) {
    var filter = {};
    if(req.query.locale){
        filter.locale = req.query.locale;
    }
    var profiles = Profile.find(filter).sort({ follower_count : -1 }).exec(function(err, profiles){
      res.render('index', {
        title: 'Deck',
        profiles: profiles
      });
    });

});
