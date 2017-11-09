const router = require("express").Router();
const storiesController = require("../../controllers/storiesController");
const commentsController = require("../../controllers/commentsController");

// Matches with "/api/books"
router.route("/")
  .get(storiesController.findAll)
  .post(storiesController.create)
  .delete(storiesController.clearCollection);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(storiesController.findById)
  .put(storiesController.update)
  .delete(storiesController.remove)
  .post(commentsController.create);

module.exports = router;
