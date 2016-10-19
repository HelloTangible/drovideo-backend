'use strict';

require('./model/db');
const Hapi = require('hapi');
var routes = require('./config/routes');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  server.route(routes);

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
})
