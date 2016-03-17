var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema ({
	username: {type: Number, required: true, unique: true},
	password: {type: String, required: true}	//EDIT
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
