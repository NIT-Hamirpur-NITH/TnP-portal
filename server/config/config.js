var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    port: process.env.PORT || 8000,
    rootPath: rootPath,
    db: 'mongodb://localhost/tnp'
  },
  production: {
    port: process.env.PORT || 80,
    rootPath: rootPath,
    db: ''
  }
}
