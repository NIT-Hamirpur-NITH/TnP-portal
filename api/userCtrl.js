var passport = require('passport');
var User = require('../models/users');
var Companies = require('../models/companies');
var XLSX = require('xlsx');

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

exports.apply = function(req, res, next){
	function datenum(v, date1904) {
	if(date1904) v+=1462;
	var epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
	}

	function sheet_from_array_of_arrays(data, opts) {
		var ws = {};
		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
		for(var R = 0; R != data.length; ++R) {
			for(var C = 0; C != data[R].length; ++C) {
				if(range.s.r > R) range.s.r = R;
				if(range.s.c > C) range.s.c = C;
				if(range.e.r < R) range.e.r = R;
				if(range.e.c < C) range.e.c = C;
				var cell = {v: data[R][C] };
				if(cell.v == null) continue;
				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

				if(typeof cell.v === 'number') cell.t = 'n';
				else if(typeof cell.v === 'boolean') cell.t = 'b';
				else if(cell.v instanceof Date) {
					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
					cell.v = datenum(cell.v);
				}
				else cell.t = 's';

				ws[cell_ref] = cell;
			}
		}
		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		return ws;
	}

	var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
	var ws_name = "SheetJS";

	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}

	var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

	/* add worksheet to workbook */
	wb.SheetNames.push(ws_name);
	wb.Sheets[ws_name] = ws;

	/* write file */
	XLSX.writeFile(wb, 'data/test.xlsx');
	res.json({
		"message":"Data written to file."
	})
}
