var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');
var Handlebars = require('handlebars');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    helpers: {
        inc: function(v){
          return Number(v) + 1;
        },
        alphaLanguage: function(){
          //TODO: move to server
          var rkorean = /[가-힣]+/g
          var rthai = /[ก-๙]+/g
          var rjapanese = new RegExp('[一-龯]+', 'g')

          var korean = (this + "").match(rkorean);
          var thai =  (this + "").match(rthai);
          var japanese =  (this + "").match(rjapanese);

          var Ranks = [
            {name: 'Thailand' , rank: (thai !== null ? thai.join("").length : 0)},
            {name: 'Korean' ,rank : (korean !== null ? korean.join("").length : 0)},
            {name: 'Japanese', rank: (japanese !== null ? japanese.join("").length: 0)}
          ]

          Ranks.sort(function(a,b) {
              return b.rank - a.rank;
          });
          // console.log(Ranks);

          return Ranks[0].rank != 0 ? Ranks[0].name : 'Unknown';

        },
        alphaFollowerCount: function (dd) {
          var re = /([0-9]+[km]?)\sfollowers/i;
          var cc = (dd + "").match(re)
          if(!cc || cc.length < 2){
            return "";
          }
          return cc[1];
        },
        alphaEmail: function(dd){
          var re = /[0-9a-zA-Z]+\@([0-9a-zA-Z]+)\.[a-zA-Z0-9]{2,6}(\.[a-zA-Z0-9]{2,6})?/g;
          var cc = (dd + "").match(re);
          if(cc == null) return "N/A";
          return new Handlebars.SafeString(cc.join("<br/> ").replace(/\s/g, '').replace(/-/g, ''))
        },
        alphaPhoneNumber: function (dd) {
          //+66 97 140 6640
          //097-140-6640
          //0971406640
          //097 140 6640

          var re = /(0|(\+66))\s?[0-9]{2}(\s|-)?[0-9]{3}(\s|-)?[0-9]{4}/g;
          var cc = (dd + "").match(re);
          if(cc == null) return "N/A";
          return new Handlebars.SafeString(cc.join("<br/> ").replace(/\s/g, '').replace(/-/g, ''))
        }
    },
    partialsDir: [config.root + '/app/views/partials/']
  }));

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
