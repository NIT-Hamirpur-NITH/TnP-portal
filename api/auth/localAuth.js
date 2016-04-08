var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../models/users');
var Tpr = require('../../models/tpr');
var Admin = require('../../models/admin');

module.exports = function(){
  passport.use('local-login', new LocalStrategy(function(username, password, done) {

    Admin.findOne({ 'username': username, 'password': password }).exec(function (err, admin) {
        if (err)
            return done(err);
        if (admin)
            return done(null, admin);
        else{
          Tpr.findOne({ 'username': username, 'password': password }).exec(function (err, tpr) {
              if (err)
                  return done(err);
              if (tpr){
                  return done(null, tpr);
              }
              else{
                User.findOne({ 'username': username, 'password': password }).exec(function (err, user) {
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, user);
                    else
                        return done(null, false);
                });
              }
          });
        }
    });
  }));

  passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },function(req, username, password, done) {
      Tpr.findOne({ 'username': username }).exec(function (err, tpr) {
          if (err)
              return done(err);
          if (tpr)
              return done(null, false);
          else {
            var input = req.body;
            var newUser = new Tpr(input);
            newUser.roles = ["tpr"];
            newUser.companies = [];
            newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
          }
      });
  }));

  passport.serializeUser(function (user, done) {
    if(user){
       done(null, user._id);
    }
   });

  passport.deserializeUser(function (id, done) {
    Admin.findOne({ '_id': id }).exec(function (err, admin) {
      if(admin)
        done(err, admin);
      else{
        Tpr.findOne({ '_id': id }).exec(function (err, tpr) {
          if(tpr)
            done(err, tpr);
          else{
            User.findOne({ '_id': id }).exec(function (err, user) {
                done(err, user);
            });
          }
        });
      }
    });
  });
}
