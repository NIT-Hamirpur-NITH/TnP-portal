var passport = require('passport');
var User = require('../models/users');
var Company = require('../models/companies');
var XLSX = require('xlsx');
var formidable = require('formidable');
var util = require('util');

var config = require('../server/config/config')['development'];

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

exports.inviteAll = function(req, res, next){
  //Invite all from database and send mail to everyone.
  /*
  var workbook = XLSX.readFile('data/database/database.xlsx');
  var sheet = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[sheet];

  var json = XLSX.utils.sheet_to_json(worksheet);
  for(i = 0; i < json.length; i++){
    var obj = json[i];
    var newUser = new User(obj);
    newUser.roles = ["user"];
    newUser.password = "root";
    newUser.save(function (err) {
      if (err) {
          throw err;
      }
    });
  }
  */
  User.find({branch:req.user.branch}).exec(function(err, user){
    if(err)
      throw err;
    for(i=0; i<user.length;i++){
      var obj = user[i];
      obj.invite = true;
      obj.save(function(err){
        if(err)
          throw err;
      });
    }
    res.json({
      "message":"Invitation sent to all.",
      "user":user
    });
  })
}

exports.getDatabase = function(req, res, next){
  User.find({branch:req.user.branch}).sort({sno:1}).exec(function(err,db){
    if(err)
      throw err;
    if(!db.length){
      res.json({
        "db":null
      })
    }else{
      res.json({
        "db":true,
        "user":db
      });
    }
  });
}

exports.uploadDatabase = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = config.rootPath + "/data/database";
  form.type = "multipart";
  form.keepExtensions = true;

  form.on('fileBegin', function(name, file) {
    var ext = file.name.split('.')[1];
    file.path = config.rootPath + '/data/database/' + req.user.branch + '.' + ext;
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete);
  });

  form.parse(req, function(err, fields, files) {
    res.json({
      "uploadInfo":util.inspect({fields: fields, files: files})
    });
  });

  form.on('error', function(err) {
    console.error(err);
  });
}
