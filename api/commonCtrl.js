var User = require('../models/users');
var Company = require('../models/companies');
var Tpr = require('../models/tpr');

exports.addCompany =  function(req, res, next){
    var input = req.body;
    var company = new Company();
    company.name=input.name;
    company.description=input.description;
    company.process=input.process;
    company.package=input.package;
    company.branches=input.branches;
    company.deadline=input.deadline;
    company.date=input.date;
    company.eligibility.tenth=input.tenth;
    company.eligibility.twelfth=input.twelfth;
    company.eligibility.btech=input.btech;
    company.postedBy=req.user._id;
    company.save();
    res.json({
      "message":company
    })
}

exports.editCompany =  function(req, res, next){
  		var input=req.body;
      Company.findOne({_id:input._id},function(err,company){
        if(input.name)
          company.name=input.name;
        if(input.date)
          company.date=input.date;
        if(input.description)
          company.description=input.description;
        if(input.package)
          company.package=input.package;
        if(input.deadline)
          company.deadline=input.deadline;
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

exports.companies = function(req, res, next){
  Company.find().exec(function(err, companies){
    if(err)
      throw err;
    if(!companies){
      res.json({
        "message":"No company visited",
        "companies":null
      });
    }else{
      res.json({
        "companies":companies
      });
    }
  });
}

exports.posted =  function(req, res, next){
  Company.find({postedBy:req.user._id}).exec(function(err, companies){
    if(err)
      throw err;
    if(!companies.length){
      res.json({
        "message":"No company posted by you.",
        "companies":null
      });
    }else{
      res.json({
        "companies":companies
      });
    }
  });
}

exports.listTpr =  function(req, res, next){
  Tpr.find().exec(function(err, tpr){
    if(err)
      throw err;
    if(!tpr.length){
      res.json({
        "message":"No Tpr added.",
        "tpr":null
      });
    }else{
      res.json({
        "tpr":tpr
      });
    }
  });
}
