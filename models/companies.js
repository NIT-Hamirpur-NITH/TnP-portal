var mongoose = require('mongoose');
var schema = mongoose.Schema;

var companiesSchema = new schema({
	name: {type: String,required:true},
	date: {type: Date},
	description: {type: String},
	package: {type: String,required:true},
	branches: [String],
	eligibilty: {
		tenth: {type: String},
		twelveth: {type: String},
		btech: {type: String}
	},
	process: {type:String}
});

var companiesModel = mongoose.model('companies',companiesSchema);

module.exports = companiesModel;