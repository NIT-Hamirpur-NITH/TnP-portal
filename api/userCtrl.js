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
		Companies.find({
			deadline: {$gte: Date.now()},
			date: {$gte: Date.now()},
			branches: {$all:[req.user.branch]},
		  "eligibility.tenth": {$lte: req.user.tenth},
			"eligibility.twelfth": {$lte: req.user.twelfth},
			"eligibility.btech": {$lte: req.user.btech}
		}).exec(function(err, companies){
			if(err)
				throw err;
			if(!companies.length){
				res.json({
					"companies":null
				})
			}else{
					callback(companies);
			}
		});
	}
	canApplyto(function (companies) {
			res.json({
				"companies":companies
		});
	});
}
