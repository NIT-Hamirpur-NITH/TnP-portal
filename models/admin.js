var mongoose = require('mongoose');
var schema = mongoose.Schema;

var adminSchema = new schema ({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	email: {type: String, required: true},
	roles: [String]
});

var adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;
