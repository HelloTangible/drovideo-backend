var Video = require('../model/video');
const mongoose = require('mongoose');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/videos/{id}',
        handler: function (request, reply) {
            reply('Vids yo!');
        }
    },
    {
        method: 'POST',
        path: '/api/v1/videos/{id}',
        handler: function (request, reply) {
            
        }
    },
    {
        method: 'DELETE',
        path: '/api/v1/videos/{id}',
        handler: function (request, reply) {
            
        }
    },
    {
        method: 'PUT',
        path: '/api/v1/videos/{id}',
        handler: function (request, reply) {
            
        }
    }
];