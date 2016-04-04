var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema ({
	username: {type: Number, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String,required:true},
	branch: {type: String,required:true},
	appliedFor: [String],
	placedIn: [String],
	roles: [String],
	tenth: {type: String, required: true},
	twelfth: {type: String, required: true},
	btech: {type: String, required: true}
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
