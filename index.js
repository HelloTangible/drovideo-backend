'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.register(require('inert'), (err) => {
  var path;

  if (err) {
    throw err;
  }
  
  if (process.env.NODE_ENV === 'development') {  
    path = '/static';
  } else {
    path = 'node_modules/drovideo-frontend/assets';
  }
  
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path
        }
    }
  });

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.url);
  });
})
