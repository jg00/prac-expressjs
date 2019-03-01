const express = require("express");
const movieDetails = require("../data/movieDetails");
const router = express.Router();

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json." });
  } else {
    // res.json("test");
    next();
  }
}

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
// ex: http://localhost:3030/movie/top_rated?api_key=123456789&page=1&elementsPerPage=3
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
// http://localhost:3030/movie/2222/rating?api_key=123456789
// Params       > movie_id (required;integer)
// Header       > Content-Type application/json (required; string) - Will be handled through middleware function
// Query String > api_key (required; string)
// Response     > { value: 0.5} (required; value between 0.5 - 10)

// Note you could have also used app.use(requireJSON) instead of calling it as another callback middleware function
router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;

  // console.log(req.get("content-type")); // check

  /* Placed into middleware function - requireJSON
  // req.is() short way to check 'Content-Type'
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json. Method - POST" });
  } else {
    res.json("test");
  }
  */

  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: "Rating must be between .5 and 10" });
  } else {
    res.json({ msg: "Thank you for submitting your rating", status_code: 200 });
  }
});

// DELETE /movie/:movieId/rating
// Params       > movie_id (required;integer)
// Header       > Content-Type application/json (required; string) - Will be handled through middleware function
// Query String > api_key (required; string)
// Response     > {}
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  /* Placed into middleware function - requireJSON
  // req.is() short way to check 'Content-Type'
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json. Method DELETE" });
  } else {
    res.json("test");
  }
  */

  /*
  RE - Representational part - Method ie GET, POST, DELETE
  ST - Stateless

  */

  const movieID = req.params.movieID; // If needed

  res.json({
    msg: "Rating delete!",
    status_code: 200
  });
});

module.exports = router;
