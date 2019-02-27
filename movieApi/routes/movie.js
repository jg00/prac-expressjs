const express = require("express");
const movieDetails = require("../data/movieDetails");
const router = express.Router();

// GET /movie/
router.get("/", (req, res, next) => {
  res.send("Movie route check");
});

// GET /movie/:movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  let results = movieDetails.find(movie => {
    return movie.id === parseInt(movieId);
  });

  // .find returns undefined if none found.  We wanted to return
  // an object so this will require validation.  You can return a
  // message or even an empty object {}.
  // console.log(results);

  if (!results) {
    res.json({
      msg: "Movie ID is not found",
      production_companies: [""] // single-movie.ejs on server is expecting an array.  So no movie id found, send an empty array.
    });
  } else {
    res.json(results);
  }
});

// GET /movie/top_rated

// POST /movie/:movieId/rating

// DELETE /movie/:movieId/rating

module.exports = router;
