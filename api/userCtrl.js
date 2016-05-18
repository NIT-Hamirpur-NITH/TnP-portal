var passport = require('passport');
var User = require('../models/users');
var Company = require('../models/companies');
var XLSX = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');			//Most important

exports.appliedFor = function(req, res, next){
	Company.find({_id: {$in:req.user.appliedFor}}).exec(function(err, companies){
		if(err)
			throw err;
		if(!companies.length){
			res.json({
				"message":"Not applied",
				"company":null
			});
		}else{
			res.json({
				"message":"Applied",
				"companies":companies
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
      Company.find({_id: {$in:user.placedIn}}).exec(function(err, company){
        if(err)
          throw err;
        if(!company.length){
          res.json({
            "message":"Not Placed yet",
            "company":null
          });
        }else{
          res.json({
						"message":"Placed",
            "placedIn":company
          });
        }
      });
    }
  });
}

exports.canApply = function(req, res, next){
	var canApplyto = function(callback){
		Company.find({
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
		User.findOne({_id:req.user.id},function(err,user){
			if(user.appliedFor.indexOf(req.params.companyid)>-1){
				// ALREADY APPLIED
			}else{
				//APPLIED
				var companiesArr = [];
				for(i = 0; i < companies.length; i++){
					var company = companies[i];
						if(req.user.roles.indexOf("user")>-1){
							if(req.user.appliedFor.indexOf(company.id)>-1){
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
	});
}

exports.apply = function(req, res, next){
	function getCompany(req, callback){
		Company.findOne({_id:req.params.companyid}).exec(function(err, company){
			if (err)
				throw err;
			if(company){
				callback(company);
			}
		});
	}

	getCompany(req, function(data){
		company_name = data.name;
		function checkCompanyDatabase(req, callback){
		  fs.readdir('data/', function(err, files){
		    if(err)
		      throw err;
		    if(!files){
					callback(false);
		    }else{
					if(files.indexOf(company_name.toUpperCase() + '.xlsx')>-1){
						callback(true);
					}else{
						callback(false);
					}
		    }
		  });
		}

		checkCompanyDatabase(req, function(data){

			/*
			*	Function to format date
			*/
			function datenum(v, date1904) {
				if(date1904) v+=1462;
				var epoch = Date.parse(v);
				return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
			}

			/* Data to be written to the final output file. */
			var userarr = [];
			userarr[1] = req.user.name;
			userarr[2] = req.user.email;
			userarr[3] = req.user.contact;
			userarr[4] = req.user.branch;
			userarr[5] = req.user.tenth;
			userarr[6] = req.user.twelfth;
			userarr[7] = req.user.btech;

			if(data){
				var workbook = new Excel.Workbook();
				/*
				*	Read the existing workbook
				*/
				workbook.xlsx.readFile('data/' + company_name.toUpperCase() + '.xlsx')
		    .then(function() {
					var worksheet = workbook.getWorksheet('Sheet1');
					worksheet.addRow(userarr);
					workbook.xlsx.writeFile('data/' + company_name.toUpperCase() + '.xlsx')
			    .then(function() {
						// ADDED TO WORKBOOK
			    });
				});
			}else{
				var workbook = new Excel.Workbook();
				workbook.creator = 'TnP';
				workbook.created = new Date(1985, 8, 30);
				workbook.modified = new Date();

				var sheet = workbook.addWorksheet('Sheet1');
				var worksheet = workbook.getWorksheet('Sheet1');

				/*
				*	Defining column headers
				*/
				worksheet.columns = [
				    { header: 'Name', key: 'name', width: 20 },
				    { header: 'Email', key: 'email', width: 32 },
						{ header: 'Contact', key: 'contact', width: 20 },
						{ header: 'Branch', key: 'branch', width: 10 },
						{ header: '10th %', key: 'tenth', width: 10 },
						{ header: '12th %', key: 'twelfth', width: 10 },
				    { header: 'B.Tech', key: 'btech', width: 10 }
				];

				worksheet.addRow(userarr);

				workbook.xlsx.writeFile('data/'+ company_name.toUpperCase() +'.xlsx')
		    .then(function() {
					// WORKBOOK CREATED
		    });
			}
		})
	})

	function sendCompanies(req, callback){
		User.findOne({_id:req.user.id},function(err,user){
			if(user.appliedFor.indexOf(req.params.companyid)>-1){
				// ALREADY APPLIED
			}else{
				user.appliedFor.push(req.params.companyid);
		    user.save();
				callback(user);
			}
		})
	}

	sendCompanies(req, function(user){
		var companiesArr = [];
		  Company.find().exec(function(err, companies){
		    if(err)
		      throw err;
	      for(i = 0; i < companies.length; i++){
	        var company = companies[i];
	          if(req.user.roles.indexOf("user")>-1){
	            if((company.deadline >= new Date()) && (company.date >= new Date()) && (company.branches.indexOf(req.user.branch)>-1) && (company.eligibility.tenth <= req.user.tenth) && (company.eligibility.twelfth <= req.user.twelfth) && (company.eligibility.btech <= req.user.btech)){
	              company.apply = 1;
	            }else{
	              company.apply = 0;
	            }
	            if(user.appliedFor.indexOf(company.id)>-1){
	              company.applied = 1;
	            }else{
	              company.applied = 0;
	            }
	          }
	          companiesArr.push(company);
	        }
	        res.json({
	          "companies":companiesArr,
						"user":req.user
	        })
	    });
	})
}

/*
*				XLSX module -------------- Time consuming and inefficient
*/

// exports.apply = function(req, res, next){
// 	function getCompany(req, callback){
// 		Company.findOne({_id:req.params.companyid}).exec(function(err, company){
// 			if (err)
// 				throw err;
// 			if(company){
// 				callback(company);
// 			}
// 		});
// 	}
//
// 	getCompany(req, function(data){
// 		company_name = data.name;
// 		/*
// 		* Reading the file first to get the range
// 		*/
// 		function checkCompanyDatabase(req, callback){
// 		  fs.readdir('data/', function(err, files){
// 		    if(err)
// 		      throw err;
// 		    if(!files){
// 					callback(false);
// 		    }else{
// 					if(files.indexOf(company_name + '.xlsx')>-1){
// 						callback(true);
// 					}else{
// 						callback(false);
// 					}
// 		    }
// 		  });
// 		}
//
// 		checkCompanyDatabase(req, function(data){
// 			rowNum = 0;
// 			if(data){
// 				var workbook = XLSX.readFile('data/'+ company_name +'.xlsx');
// 			  var sheet = workbook.SheetNames[0];
// 			  var worksheet = workbook.Sheets[sheet];
// 				var ref = worksheet['!ref'];
// 				var desired_cell = worksheet['C1'];
// 				var desired_value = desired_cell.v;
// 				var row = ref.split(':')[0];
// 				var col = ref.split(':')[1];
// 				rowNum = col[1];
// 			}
//
// 			function datenum(v, date1904) {
// 				if(date1904) v+=1462;
// 				var epoch = Date.parse(v);
// 				return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
// 			}
//
// 			/*
// 			*	Function that writes data to file
// 			*/
// 			function write_data(data, opts){
// 				var ws = {};
// 				var R = rowNum, C = 0;
// 				var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
//
// 				if(range.s.r > R) range.s.r = R;
// 				if(range.s.c > C) range.s.c = C;
//
// 				for(C = 0; C != data.length; ++C){
// 					if(range.e.r < R) range.e.r = R;
// 					if(range.e.c < C) range.e.c = C;
// 					var cell = {v: data[C] };
// 					if(cell.v == null) continue;
// 					var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
//
// 					if(typeof cell.v === 'number') cell.t = 'n';
// 						else if(typeof cell.v === 'boolean') cell.t = 'b';
// 						else if(cell.v instanceof Date) {
// 							cell.t = 'n'; cell.z = XLSX.SSF._table[14];
// 							cell.v = datenum(cell.v);
// 						}
// 						else cell.t = 's';
//
// 						ws[cell_ref] = cell;
// 				}
//
// 				if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
// 				return ws;
// 			}
//
// 			/* Data to be written to the final output file. */
// 			var userarr = [];
// 			userarr[0] = req.user.name;
// 			userarr[1] = req.user.email;
// 			userarr[2] = req.user.branch;
// 			userarr[3] = req.user.tenth;
// 			userarr[4] = req.user.twelfth;
// 			userarr[5] = req.user.btech;
//
// 			/* Specify a sheet name */
// 			var ws_name = "Sheet1";
//
// 			/* Create a workbook */
// 			function Workbook() {
// 				if(!(this instanceof Workbook)) return new Workbook();
// 				this.SheetNames = [];
// 				this.Sheets = {};
// 			}
//
// 			var wb = new Workbook();
// 			var ws = write_data(userarr);
//
// 			/* Add worksheet to workbook */
// 			wb.SheetNames.push(ws_name);
// 			wb.Sheets[ws_name] = ws;
//
// 			/* Write file */
// 			XLSX.writeFile(wb, 'data/'+ company_name +'.xlsx');
// 		})
// 		res.json({
// 			"message":"Data written to file."
// 		})
// 	})
// }
