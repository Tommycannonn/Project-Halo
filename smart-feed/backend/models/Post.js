const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  categories: [{
    type: String,
    enum: ['innovation', 'sustainability', 'science', 'architecture', 'robotics', 'chemistry', 'coding', 'other']
  }],
  aiScore: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);