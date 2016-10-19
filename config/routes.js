var videoRoutes = require('../controllers/video');
var staticRoutes = require('../controllers/static');

module.exports = [].concat(videoRoutes, staticRoutes);