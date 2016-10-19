var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  name: String,
  owner: String,
  description: String,
  location: {
      lat: Number,
      long: Number
  },
  equipment: String,
  createdOn: { type: Date, default: Date.now },
  video_uri: String,
  hidden: { type: Boolean, default: false},
  tags: [{ tagName: String }],
  comments: [{ body: "string", date: Date }],
  meta: {
      votes: Number,
      favs: Number
  }
});

module.exports = mongoose.model('Video', videoSchema);