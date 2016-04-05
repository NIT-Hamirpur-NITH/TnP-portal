var http = require('http');
var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var config = require('./server/config/config')[env];

require('./server/config/mongoose')(config);
require('./server/config/express')(app, config);

/**
  * Setting route variables
  */
var setRoutes = require('./routes/setRoutes');
var apiRoutes = require('./routes/apiRoutes');

app.use('/api', apiRoutes);
app.use('*', setRoutes);

server.listen(config.port, function(){
 	console.log(Date(Date.now()) + '\nServer running on port: ' + config.port);
 });
