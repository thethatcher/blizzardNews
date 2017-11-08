const router = require("express").Router();
const storiesController = require("../../controllers/storiesController");

router.route("/")
	.get(storiesController.scrape);

module.exports = router;