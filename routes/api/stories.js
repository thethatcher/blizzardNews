const router = require("express").Router();
const storiesController = require("../../controllers/storiesController");

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
  .delete(storiesController.remove);

module.exports = router;
