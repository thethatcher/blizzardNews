const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({

  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  //'game' is required and says what game the article is for
  game: {
    type: String,
    required: true
  },
  //'description' is a description of the article
  description: {
    type: String,
    required: true
  },
  //'article_id' is a unique number used to determine if an article is in the db already.
  article_id: {
  	type: Number
  },
  // `Comment` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated Comment
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
