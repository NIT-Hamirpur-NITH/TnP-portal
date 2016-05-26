var User = require('../models/users');
var Company = require('../models/companies');
var Tpr = require('../models/tpr');

var nodemailer = require('nodemailer');
var CONF_FILE = require('./auth/CONF_FILE.js')

var smtpConfig = {
  service: 'Gmail',
  auth: {
      user: CONF_FILE.EMAIL.username,
      pass: CONF_FILE.EMAIL.password
  }
};
var transporter = nodemailer.createTransport('SMTP',smtpConfig);

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
    company.apply=0;
    company.applied=0;
    company.save();

    User.find().exec(function(err, user){
      if(err)
        throw err;
      for(i=0; i<user.length;i++){
        var obj = user[i];
        var mailOptions = {
            from: '"TnP " <'+ CONF_FILE.EMAIL.username +'>',
            to: obj.email,
            subject: 'Registration',
            text: 'Company name:'+company.name+'. Kindly Check your dashboard on TnP Portal and check eligibilty.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Email send: ' + info.response);
        });
      }
    })
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

exports.deleteCompany =  function(req, res, next){
  Company.remove({_id:req.params.id},function(err,company){
    Company.find().exec(function(err, companies){
      if(err)
        throw err;
      if(!companies.length){
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
  });
}

exports.companies = function(req, res, next){
  var companiesArr = [];
  Company.find().exec(function(err, companies){
    if(err)
      throw err;
    if(!companies.length){
      res.json({
        "message":"No company visited",
        "companies":null
      });
    }else{
      for(i = 0; i < companies.length; i++){
        var company = companies[i];
          if(req.user.roles.indexOf("user")>-1){
            if((company.deadline >= new Date()) && (company.date >= new Date()) && (company.branches.indexOf(req.user.branch)>-1) && (company.eligibility.tenth <= req.user.tenth) && (company.eligibility.twelfth <= req.user.twelfth) && (company.eligibility.btech <= req.user.btech)){
              company.apply = 1;
            }else{
              company.apply = 0;
            }
            if(req.user.appliedFor.indexOf(company._id)>-1){
              company.applied = 1;
            }else{
              company.applied = 0;
            }
          }
          companiesArr.push(company);
        }
        res.json({
          "companies":companiesArr
        })
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

exports.placed =  function(req, res){
  User.find().exec(function(err, users){
    if(err)
      throw err;
    if(!users.length){
      res.json({
        "message":"No students placed.",
        "users":users
      });
    }else{
      var userarr = [];
      var com_ids = [];
      for(i=0; i<users.length;i++){
        var user = users[i];
        if(user.placedIn.length){
          for(j=0; j<user.placedIn.length;j++){
            com_ids.push(user.placedIn[j]);
          }
          userarr.push(user);
        }
      }
      Company.find({_id: {$in:com_ids}}).exec(function(err, company){
        if(err)
          throw err;
        if(!company.length){
          res.json({
            "message":"No placed students.",
            "placedStudents":false,
            "users":null,
            "companies":null
          })
        }else{
          res.json({
            "message":"List of placed students",
            "users":userarr,
            "companies":company,
            "placedStudents":true
          })
        }
      })
    }
  });
}

exports.download =  function(req, res){
  var filename = req.params.filename.toUpperCase();
  var path=require('path');
  var file = req.params.file;
  res.download(path.resolve(".")+'/data/'+filename+'.xlsx');
}
