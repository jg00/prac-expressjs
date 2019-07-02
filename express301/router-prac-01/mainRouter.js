const express = require("express");
let router = express.Router();

// /
router.get("/", (req, res, next) => {
  res.send("<h2>Main - Home</h2>");
});

// /allposts
router.get("/allposts", (req, res, next) => {
  res.send("<h2>Main - All Posts</h2>");
});

module.exports = router;
