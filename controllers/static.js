var staticPath = require('../config/static_path');

var staticConfig = (request, reply) => {
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
    path: '/{param*}',
    handler: {
      directory: {
        path: staticPath
      }
    }
  }
];