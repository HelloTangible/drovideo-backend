var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({ 
  body: 'string', 
  commenter: 'string', 
  createdOn: { type: Date, default: Date.now }
});

module.exports = {
    schema: commentSchema,
    model: mongoose.model('Comment', commentSchema)
}