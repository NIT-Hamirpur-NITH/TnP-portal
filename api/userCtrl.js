var passport = require('passport');
var User = require('../models/users');
var Companies = require('../models/companies');

exports.appliedFor = function(req, res, next){
	User.findOne({_id: req.user._id}).exec(function(err, user){
    if(err)
      throw err;
    if(!user){
      res.json({
        "status":"error.",
        "message":"No user found."
      })
    }else{
      Companies.find({_id: {$in:user.appliedFor}}).exec(function(err, company){
        if(err)
          throw err;
        if(!company){
          res.json({
            "message":"Not applied",
            "company":undefined
          });
        }else{
          res.json({
            "appliedFor":company,
          });
        }
      });
    }
  });
}

exports.placedIn = function(req, res, next){
	User.findOne({_id: req.user._id}).exec(function(err, user){
    if(err)
      throw err;
    if(!user){
      res.json({
        "status":"error.",
        "message":"No user found."
      })
    }else{
      Companies.find({_id: {$in:user.placedIn}}).exec(function(err, company){
        if(err)
          throw err;
        if(!company){
          res.json({
            "message":"Not Placed yet",
            "company":undefined
          });
        }else{
          res.json({
            "placedIn":company
          });
        }
      });
    }
  });
}

exports.canApply = function(req, res, next){
	var canApplyto = function(callback){
		Companies.find({deadline: {$gte: Date.now()}}).exec(function(err, companies){
			callback(companies);
		});
	}
	canApplyto(function (companies) {
				res.json({
					"message":companies
			});
		});
}
