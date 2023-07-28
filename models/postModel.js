const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required.'],
      minlength: [3, 'Title must be at least 3 characters long.'],
      maxlength: [20, 'Title cannot exceed 20 characters.']
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    author: {
      type: String,
      required: [true, 'Author is required.'],
      minlength: [3, 'Author name must be at least 3 characters long.']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
