import axios from "axios";

export default {
  // Gets all books
  getStories: function() {
    return axios.get("/api/stories");
  },
  // Gets the book with the given id
  getStory: function(id) {
    return axios.get("/api/stories/" + id);
  },
  // Deletes the book with the given id
  deleteStory: function(id) {
    return axios.delete("/api/stories/" + id);
  },
  // Saves a book to the database
  saveStory: function(bookData) {
    return axios.post("/api/stories", bookData);
  },
  //clears the entire collection of stories from the db
  clearCollection: function(){
    return axios.delete("/api/stories");
  },
  scrape: function(){
    return axios.get("api/scrape");
  }
};
