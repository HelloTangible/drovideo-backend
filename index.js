'use strict';

require('./model/db');

const Hapi = require('hapi');
var Path = require('path');

var routes = require('./config/routes');
var staticPath = require('./config/static_path');
var goodConfig = require('./config/good-config.js')

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, staticPath)
            }
        }
    }
});

server.connection({ port: process.env.PORT || 3000 });

server.register([require('inert'), require('hapi-auth-jwt'), {
  register: require('good'),
  goodConfig
}], (err) => {

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
