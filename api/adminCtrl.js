var passport = require('passport');
var User = require('../models/users');
var Company = require('../models/companies');

exports.getDatabase = function(req, res, next){
  User.find({branch:req.params.branch}).sort({sno:1}).exec(function(err,db){
    if(err)
      throw err;
    if(!db)
      console.log("No user");
    res.json({
      "user":db
    });
  });
}
