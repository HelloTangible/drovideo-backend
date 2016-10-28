var staticPath = require('../config/static_path');
var fs = require('fs');

var staticConfig = (request, reply) => {
  console.log(`Path: ${staticPath}`);
  
  fs.stat(`${staticPath}/index.html`, function (err, stats) {
    console.log(err ? "not found or no access" : "it's there!");
    console.log(stats);
  });

  return reply.file(`${staticPath}/index.html`, { confine: false });
}

module.exports = [
  {
    method: 'GET',
    path: '/home',
    handler: staticConfig
  },
  {
    method: 'GET',
    path: '/map',
    handler: staticConfig
  },
  {
    method: 'GET',
    path: '/',
    handler: staticConfig
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: staticPath
      }
    }
  }
];