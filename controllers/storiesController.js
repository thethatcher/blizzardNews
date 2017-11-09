const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Story
      .find(req.query)
      .sort({article_id: -1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Story
      .findById(req.params.id)
      .populate("note")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Story
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Story
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Story
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  clearCollection: function(req,res) {
    db.Story.remove({});
  },
  scrape: function(req , res) {
    // First, we grab the body of the html with request
    axios.get("https://news.blizzard.com/en-us/").then(function(response) 
    {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
      const scrapeArray = [];
      // Now, we grab every h2 within an article tag, and do the following:
      $("div .ArticleListItem").each(function(i, element) {
        // Save an empty result object
        var result = {};
        // Add the appropriate values to the result object for use later. 
        result.title = $(this).find(".ArticleListItem-title").text();
        result.link = "https://news.blizzard.com" + $(this).find("a").attr("href");
        result.game = $(this).find(".ArticleListItem-labelInner").text();
        result.description = $(this).find(".ArticleListItem-description").text(); 
        result.article_id = $(this).find("a").attr("data-article-id");
        scrapeArray.push(result);
      })
      //since Cheerio's .each function is synchronous the next line will run once .each is finished. 
      db.Story.find({},{article_id:1, _id: 0}).then(dbModel => {
        //create an array of just the article ids of existing stories
        const articleIdArray = dbModel.map((article) =>{
          return article.article_id;
        });
        //create an array that only contains stories not present in the db already. 
        const newStories = scrapeArray.filter( (el) => {
          return articleIdArray.indexOf(parseInt(el.article_id)) < 0;
        });
        //add any new stories to the
        db.Story.create(newStories)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      }).catch(err => res.status(422).json(err));
    });
  }
};
