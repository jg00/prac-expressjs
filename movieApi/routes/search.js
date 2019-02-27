const express = require("express");
const router = express.Router();

// GET /search/
router.get("/", (req, res, next) => {
  //   console.log(req.headers);
  res.send("Search route check");
});

module.exports = router;
