var express = require('express'),
  router = express.Router(),
  YoutubeProfile = require('../models/youtube');

module.exports = function (app) {
  app.use('/deck/youtube', router);
};

router.get('/', function (req, res, next) {
    var filter = req.query.filter || '{}';
    var page = Number(req.query.page || 1);
    var limit = Number(req.query.limit || 15);
    var _filter = JSON.parse(filter);

    var skip = (page - 1) * limit;

    var pages = [];

    YoutubeProfile.count(_filter, function(err, c) {
        //pagination logic
        var MAXBTN = 12;
        var TRAIL = 3;
        var pageCount = Math.floor(c/limit);

        if(pageCount > MAXBTN){
          for(i = 0; i <= TRAIL; i++){
              pages.push(i+1);
            }

            for(i = page - TRAIL; i <= page + TRAIL; i++){
              if(i > TRAIL + 1 && i < pageCount - TRAIL){
                pages.push(i);
              }
            }

            for(i = pageCount - TRAIL - 1; i <= pageCount; i++){
              pages.push(i+1);
            }
        }else{
          for(i = 0; i <= pageCount; i++){
            pages.push(i+1);
          }
        }

        var profiles = YoutubeProfile.find(_filter).skip(skip).limit(limit).sort({ subscriber_count : -1 })
        .exec(function(err, profiles){
          res.render('youtube', {
            title: 'Deck',
            profiles: profiles,
            profile_count: c,
            pages: pages,
            currentPage: page
          });
        });
    });


});
