var passport = require('passport');
var User = require('../models/users');
var localAuth = require('../api/auth/localAuth')();
var Companies = require('../models/companies');

exports.placedIn =  function(req, res, next){
	User.findOne({_id: req.user._id}).exec(function(err, user){
    if(err)
      throw err;
    if(!user){
      res.json({
        "status":"error.",
        "message":"No user found."
      })
    }else{
      Companies.findOne({_id: {$in:user.placedIn}}).exec(function(err, company){
        if(err)
          throw err;
        if(!company){
          res.json({
            "message":"Not Placed yet",
            "company":undefined
          });
        }else{
          res.json({
            "placedIn":company.name
          });
        }
      });
    }
  });
}
