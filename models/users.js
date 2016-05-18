var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema ({
	sno:{type: Number, required:true},
	username: {type: Number, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	email: {type: String, required: true},
	branch: {type: String, required:true},
	contact: {type: Number, required:true},
	appliedFor: [String],
	placedIn: [String],
	roles: [String],
	tenth: {type: Number, required: true},
	twelfth: {type: Number, required: true},
	btech: {type: Number, required: true},
	invite: {type: Boolean, default: 0}
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
