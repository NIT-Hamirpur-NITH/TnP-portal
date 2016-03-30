var passport = require('passport');
var User = require('../models/users');
var localAuth = require('../api/auth/localAuth')();
var Companies = require('../models/companies');

exports.appliedFor =  function(req, res, next){
  		User.find({_id: req.user._id},function(err,user){
        var user = JSON.stringify(user);
        console.log('username = ' + user.username);
        var array = ["56fc329c1cd286720becb9dd"];
        Companies.find({_id: {"$in":array}}), function(err, company){
          console.log('company = '+company);
          if(company){
            res.json({
              "appliedFor":company
            })
          }else{
            res.json({
              "message":"Not applied",
              "company":undefined
            })
          }
        }
      });
};