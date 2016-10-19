var path;

if (process.env.NODE_ENV === 'development') {
  path = '/static';
} else {
  path = 'node_modules/drovideo-frontend/assets';
}

module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path
      }
    }
  }
];