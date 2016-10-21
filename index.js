'use strict';

require('./model/db');

const Hapi = require('hapi');

var routes = require('./config/routes');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.register([require('inert'), require('hapi-auth-jwt')], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('token', 'jwt', {
    key: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    verifyOptions: {
      algorithms: [ 'HS256' ],
      audience: process.env.AUTH0_CLIENT_ID
    }
  });

  server.route(routes);

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
})
