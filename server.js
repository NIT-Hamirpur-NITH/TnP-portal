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
var routes = require('./routes/setRoutes');
var apiRoutes = require('./routes/apiRoutes');

app.use('/', routes);
app.use('/api', apiRoutes);
app.get('*', function(req, res){
  res.redirect('/');
});

server.listen(config.port, function(){
 	console.log(Date(Date.now()) + '\nServer running on port: ' + config.port);
 });
