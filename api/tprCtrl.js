var passport = require('passport');
var User = require('../models/users');
var localAuth = require('../api/auth/localAuth')();
var Company = require('../models/companies');
var XLSX = require('xlsx');
var workbook = XLSX.readFile('data/database/database.xlsx');


exports.addCompany =  function(req, res, next){
    var input = req.body;
    var company = new Company();
    company.name=input.name;
    company.description=input.description;
    company.package=input.package;
    company.branches=input.branches;
    company.branches=input.branches;
    company.deadline=input.deadline;
    company.date=input.date;
    company.eligibility.tenth=input.tenth;
    company.eligibility.twelfth=input.twelfth;
    company.eligibility.btech=input.btech;
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

exports.sendInvite = function(req, res, next){
  var sheet = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[sheet];

  var json = XLSX.utils.sheet_to_json(worksheet);
  for(i = 0; i < json.length; i++){
    var obj = json[i];
    var newUser = new User(obj);
    newUser.roles = ["user"];
    newUser.save(function (err) {
      if (err) {
          throw err;
      }
    });
  }
  res.json({
    "message":"Invitation sent."
  });
}

exports.getDatabase = function(req, res, next){
  var sheet = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[sheet];

  var json = XLSX.utils.sheet_to_json(worksheet);

  res.json({
    "database":json
  });
}
