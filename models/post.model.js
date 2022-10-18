const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: {
    type: Array,
    required: true,
    default: [],
  },
});

// .model laukia "collection name" (6iuo atveju post) ir postSchema
const Post = mongoose.model("post", postSchema)
module.exports = Post;