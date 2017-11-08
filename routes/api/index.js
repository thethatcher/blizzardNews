const router = require("express").Router();
const storyRoutes = require("./stories");
const scrapeRoutes = require("./scrape");

// Book routes
router.use("/stories", storyRoutes);
router.use("/scrape", scrapeRoutes);

module.exports = router;
