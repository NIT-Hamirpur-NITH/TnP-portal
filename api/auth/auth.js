var passport = require('passport');
var User = require('../../models/users');
var localAuth = require('./localAuth')();

exports.loginAuthenticate = function(req, res, next) {
  var auth = passport.authenticate('local-login', function(err, user, info){
      if(err){
        return next(err);
        /*
        * In this case no headers are being set so we can call next(); and the first argument of any callback function is err
        */
      }
      if(!user){
          res.json({
                      "message":"Login unsuccessful",
                      "name":"login"
                    });
      }else{
        /*
        * We have to log the user in because we are using XHR post to send the credentials not the server side route (submit form)
        * Not the way passport is expected to function.
        * Had it been its original we wud not have even called this function.
        * Passport itself logs the user in and creates a session (in local strategy)
        */
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
        /*
        * req.session.passport.user contains the session_id of the current user.
        */
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
  }
  else{
      next();
  }
}

exports.logout = function(req, res, next){
  if(req.isAuthenticated()){
    req.logout();
    res.json({
      "message":"User logged out."
    });
  }
  else{
    res.json({
      "message":"Not logged in."
    });
  }
}
