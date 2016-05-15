var User = require('../models/users');
var Companies = require('../models/companies');

exports.companies = function(req, res, next){
  Companies.find().exec(function(err, companies){
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
