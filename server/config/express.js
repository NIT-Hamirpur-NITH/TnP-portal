var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var logger = require('morgan');

module.exports = function(app, config){
  app.set('views', path.join(config.rootPath, '/server/views'));
  app.engine('html', require('ejs').renderFile);  //Using HTML as view engine
  app.set('view engine', 'html');
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'youvians',
					          resave: true,
  					        saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(config.rootPath, '/public')));
  app.use(express.static(path.join(config.rootPath, '/server/views')));
}
