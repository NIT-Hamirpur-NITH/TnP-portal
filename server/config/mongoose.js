var mongoose = require('mongoose');

/*
	CONNECTING TO DATABASE
*/

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Mongo DB connection error...'));
    db.once('open', function callback() {
        console.log("Connection to MongoDB database established at " + config.db);
    });
}
