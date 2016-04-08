var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tprSchema = new schema ({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	email: {type: String, required: true},
	branch: {type: String, required:true},
	companies: [String],
	roles: [String]
});

var tprModel = mongoose.model('tprs', tprSchema);

module.exports = tprModel;
