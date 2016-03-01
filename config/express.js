'use strict';

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var csrf = require('csurf');
var swig = require('swig');


var mongoStore = require('connect-mongo/es5')(session);
var flash = require('connect-flash');
var helpers = require('view-helpers');
var config = require('./config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {
  // Compression middleware (should be placed before express.static)
  //app.use(compression({
  //  threshold: 512
  //}));

  // Static files middleware; in production use nginx
  if (env !== 'production') {
    app.use(express.static(config.root + '/public'));
  }

  // var multipart = require('connect-multiparty');
  // var multipartMiddleware = multipart();
  // app.use('/', multipartMiddleware);

  // Don't log during tests, log with nginx in production
  // Logging middleware
  if (env === 'development') {
    app.use(morgan('dev'));
  }

  // Swig templating engine settings
  if (env === 'development' || env === 'test') {
    swig.setDefaults({
      cache: false,
      varControls: ['{=', '=}']
    });
  } else {
    swig.setDefaults({
      varControls: ['{=', '=}']
    });
  }
  // swig.setDefaultTZOffset((new Date()).getTimezoneOffset());

  // set views path, template engine and default layout
  app.engine('html', swig.renderFile);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');

  //check isWechatVisit
  app.use(function (req, res, next) {
    var ua = req.headers['user-agent'];
    if (ua && ua.match(/MicroMessenger/i) === 'MicroMessenger') {
      req.isWechatVisit = true;
      next();
    } else {
      req.isWechatVisit = false;
      next();
    }
  });

  // check isNotPageRequest
  app.use(function (req, res, next) {
    if (/^\/(ws|api)/.test(req.originalUrl)) {
      req.isNotPageRequest = true;
    } else {
      req.isNotPageRequest = false;
    }
    return next();
  });

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));

  // adds CORS support
  // app.use(cors());

  // adds CSRF support
  // if (process.env.NODE_ENV === 'production') {
  //   //app.use(csrf());
  //   //
  //   //// This could be moved to view-helpers :-)
  //   //app.use(function(req, res, next){
  //   //  res.cookie('XSRF-TOKEN', req.csrfToken());
  //   //  res.locals.csrf_token = req.csrfToken();
  //   //  next();
  //   //});
  // }
};
