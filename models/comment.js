const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({

  name: {
    type: String,
  },
  body: {
    type: String,
    required: true
  },
  date: {
  	type: Date,
  	default: Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
