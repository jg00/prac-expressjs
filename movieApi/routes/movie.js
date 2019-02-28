const express = require("express");
const movieDetails = require("../data/movieDetails");
const router = express.Router();

// Possible to run a callack if a specified wildcard is used
// We can hand it any string and if it matches any wildcard in the route then
// this callback will kickoff.
router.param("movieId", (req, res, next) => {
  // Use case - here we can run some databse code
  // Use case - if only certain apiKeys are allowed to hit movieID route
  console.log("Someone hit a route that used the movieID wildcard!");
  next();
});

// GET /movie/
router.get("/", (req, res, next) => {
  res.send("Movie route check");
});

// GET /movie/top_rated
// ex: http://localhost:3030/movie/top_rated?api_key=123456789&page=3
router.get("/top_rated", (req, res, next) => {
  let elementsPerPage = res.locals.elementsPerPage; // Set page to contain 20 elements.
  let page = req.query.page;
  if (!page) page = 1;

  const results = movieDetails
    .sort((a, b) => {
      return b.vote_average - a.vote_average; // Compare function. Sort desc.
    })
    .slice(page * elementsPerPage - elementsPerPage, page * elementsPerPage);

  res.json(results);
});

// GET /movie/:movieId
// This route needs to come last b/c of the /:movieId param
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

// POST /movie/:movieId/rating
// In progress...
/*
    Need movieId to rate
    Provide value (number) between 0.5 and 10.0
    POST route send data as object
    {
      "value": 8.5
    }
    We can then use req.params.movieID and get the value using req.body.value
*/

router.post("/:movieId/rating", (req, res, next) => {});

// DELETE /movie/:movieId/rating

module.exports = router;
