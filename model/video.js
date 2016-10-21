var mongoose = require('mongoose');
var commentObject = require('./comment');

var videoSchema = new mongoose.Schema({
  name: String,
  owner: String,
  description: String,
  location: [Number], // [<long>, <lat>]
  equipment: String,
  createdOn: { type: Date, default: Date.now },
  video_uri: String,
  hidden: { type: Boolean, default: false},
  tags: Array,
  comments: [commentObject.schema],
  favs: Number
});

videoSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Video', videoSchema);