var passport = require('passport');
var User = require('../../models/users');
var localAuth = require('../../api/auth/localAuth')();
var Company = require('../../models/companies');


exports.addCompany =  function(req, res, next){
	User.findOne({_id: req.user._id}).exec(function(err, user){
    if(err)
      throw err;
    if(!user){
      res.json({
        "status":"error.",
        "message":"No user found."
      })
    }else{
          var input = req.body;
          if(user.roles.indexOf("admin")>-1){
            console.log(input);
          var company = new Company();
          company.name=input.name;
          company.description=input.description;
          company.package=input.package;
          company.branches=input.branches;
          company.process=input.process;
          company.eligibility.tenth=input.tenth;
          company.eligibility.twelfth=input.twelfth;
          company.eligibility.btech=input.btech;
          company.save();
          res.json({
            "message":company
          })
          }
          else {
            res.json({
              "message":"you are not an admin"
            })
          }
    }
  });
}

exports.editCompany =  function(req, res, next){
  var input=req.body;
  if(req.user.roles.indexOf("admin")>-1){
      Company.findOne({_id:input._id},function(err,company){
        if(input.name)
          company.name=input.name;
        if(input.date)
          company.date=input.date;
        if(input.description)
          company.description=input.description;
        if(input.package)
          company.package=input.package;
        if(input.branches)
          company.branches=input.branches;
        if(input.tenth)
          company.eligibility.tenth=input.tenth;
        if(input.twelfth)
          company.eligibility.twelfth=input.twelfth;
        if(input.btech)
          company.eligibility.btech=input.btech;
        if(input.process)
            company.process=input.process;

        company.save();
        res.json({
          "message":company
        });
      });
  }
  else {
      res.json({
        "message":"You are not an admin.",
        "status":null
      });
  }
}
