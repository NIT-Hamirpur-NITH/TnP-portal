var passport = require('passport');
var User = require('../../models/users');
var localAuth = require('./localAuth')();

exports.isAdmin= function(req, res, next){
      if(req.user.roles.indexOf("admin")>-1){
        next();
      }
      else {
          res.json({
            "message":"You are not an admin.",
            "status":null
          });
      }
}

exports.isTpr= function(req, res, next){
      if(req.user.roles.indexOf("tpr")>-1){
        next();
      }
      else {
          res.json({
            "message":"You are not a TPR.",
            "status":null
          });
      }
}

exports.isUser= function(req, res, next){
      if(req.user.roles.indexOf("user")>-1){
        next();
      }
      else {
          res.json({
            "message":"You are not a User.",
            "status":null
          });
      }
}

exports.isAuthorized= function(req, res, next){
      if((req.user.roles.indexOf("tpr")>-1) || (req.user.roles.indexOf("admin")>-1)){
        next();
      }
      else {
          res.json({
            "message":"You are not authorized",
            "status":null
          });
      }
}
