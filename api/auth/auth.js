var passport = require('passport');
var localAuth = require('./localAuth')();

exports.loginAuthenticate = function(req, res, next) {
  var auth = passport.authenticate('local-login', function(err, user, info){
      if(err){
        return next(err);
      }
      if(!user){
          res.json({
            "user":undefined
          });
      }else{
        req.logIn(user, function(err){
          if(err) {
            return next(err);
          }
          res.json({
                      "message":"Login successful",
                      "name":"login",
                      "user":user
                    });
        });
      }
  });
    auth(req, res, next);
}

exports.signupAuthenticate = function(req, res, next) {
  var auth = passport.authenticate('local-signup', function(err, user, info){
      if(err){
        return next(err);
      }
      if(!user){
          res.json({
                      "message":"Signup unsuccessful",
                      "name":"signup",
                      "error":"user already exists",
                      "user":undefined
                    });
      }else{
          if(err) {
            return next(err);
          }
          res.json({
                      "message":"Signup successful",
                      "name":"signup",
                      "user":user
                    });
      }
  });
    auth(req, res, next);
}

exports.alreadyLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
      res.json({
        "message":"You are already logged in.",
        "user": req.user
      });
  }else{
      next();
  }
}

exports.logout = function(req, res, next){
  if(req.isAuthenticated()){
    req.logout();
    res.json({
      "message":"User logged out.",
      "user":undefined
    });
  }else{
    res.json({
      "message":"Not logged in.",
      "user":undefined
    });
  }
}

exports.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.json({
      "message":"Not logged in.",
      "user":undefined
    })
  }
}
