const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/blizzNews",
  {
    useMongoClient: true
  }
);

const storySeed = [
  {
    "title":"test"
    ,"link":"http://test.test.com"
    ,"game":"Overwatch"
    ,"description": "This is a test"
    ,"article_id": 123456
  }
];

const commentSeed = [
{
  name: "Hero",
  body: "Overwatch is the best ever!"
},
{
  name: "Joe",
  body: "Overwatch really is the best!"
}
];

db.Story
  .remove({})
  .then(() => db.Story.collection.insertMany(storySeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
  })
  .catch(err => {
    console.error(err);
  });

db.Comment
  .remove({})
  .then(() => db.Comment.collection.insertMany(commentSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted to comments!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });