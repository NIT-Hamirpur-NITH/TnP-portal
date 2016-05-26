var passport = require('passport');
var User = require('../models/users');
var Company = require('../models/companies');
var Tpr = require('../models/tpr');
var XLSX = require('xlsx');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
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

exports.ifDb = function(req, res, next){
  var db = false;
  fs.readdir('data/database/', function(err, files){
    if(err)
      throw err;
    if(!files){
      res.json({
        "db":false
      })
    }else{
      files.forEach(function(file){
        var name = file.split('.')[0];
        if(name == req.user.branch){
          db = true;
        }
      })
      if(db){
        res.json({
          "db":true
        })
      }else{
        res.json({
          "db":false
        })
      }
    }
  });
}

exports.uploadDatabase = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = "data/database";
  form.type = "multipart";
  form.keepExtensions = true;

  form.on('fileBegin', function(name, file) {
    var ext = file.name.split('.')[1];
    file.path = 'data/database/' + req.user.branch + '.' + ext;
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete);
  });

  form.parse(req, function(err, fields, files) {
    res.json({
      "db":true,
      "uploadInfo":util.inspect({fields: fields, files: files})
    });
  });

  form.on('error', function(err) {
    console.error(err);
  });
}

exports.addDatabase = function(req, res, next){
  var workbook = XLSX.readFile('data/database/' + req.user.branch + '.xlsx');
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
  res.json({
    "db":true
  })
}

exports.inviteAll = function(req, res, next){
  User.find({branch:req.user.branch}).exec(function(err, user){
    if(err)
      throw err;
    for(i=0; i<user.length;i++){
      var obj = user[i];
      var mailOptions = {
          from: '"TnP " <'+ CONF_FILE.EMAIL.username +'>',
          to: obj.email,
          subject: 'Registration',
          text: 'Username : '+obj.username+' and Password : root'
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Email send: ' + info.response);
      });
      obj.invite = true;
      obj.save(function(err){
        if(err)
          throw err;
      });
    }
    res.json({
      "inviteSent":true,
      "user":true,
      "message":"Invitation sent to all."
    });
  })
}

exports.inviteSent = function(req, res, next){
  User.find({branch:req.user.branch, invite:false}).exec(function(err, user){
    if(err)
      throw err;
    if(!user.length){
      res.json({
        "inviteSent":true,
        "user":true,
        "message":"Invitation sent to all."
      })
    }else{
      res.json({
        "inviteSent":false,
        "user":true,
        "message":"Invitation not sent to all."
      });
    }
  })
}

exports.ifBranch = function(req, res, next){
  User.find({branch:req.user.branch}).exec(function(err, user){
    if(err)
      throw err;
    if(!user.length){
      res.json({
        "inviteSent":false,
        "user":null
      })
    }else{
      next();
    }
  })
}

exports.getUsers= function(req, res){
  User.find().exec(function(err, users){
    if(err)
      throw err;
    if(!users.length){
      res.json({
        "message":"No student has applied yet.",
        "users":null
      })
    }else{
      var userarr = [];
      var companies = [];
      var com_ids = [];
      for(i=0; i<users.length;i++){
        var user = users[i];
        if(user.appliedFor.length){
          for(j=0; j<user.appliedFor.length;j++){
            com_ids.push(user.appliedFor[j]);
            // userarr.push(user);
          }
          userarr.push(user);
        }
      }

      function getAssocCompanies(req, callback){
        Company.find({_id: {$in:com_ids}}).exec(function(err, company){
          if(err)
            throw err;
          callback(company)
        })
      }

      getAssocCompanies(req, function(company){
        res.json({
          "message":"Students who have applied.",
          "users":userarr,
          "companies":company
        })
      })
    }
  })
}

exports.addPlacement= function(req, res){
  User.findOne({_id:req.params.user_id}).exec(function(err, user){
    if(err)
      throw err;
    user.placedIn.push(req.params.company_id);
    user.save(function(err){
      if(err)
        throw err;
    });
  })
  res.json({
    "message":"Placement added",
    "company":req.params.company_id,
    "user":req.params.user_id
  })
}
