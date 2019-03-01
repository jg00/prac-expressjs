const express = require("express");
const router = express.Router();

const movies = require("../data/movies");
const people = require("../data/people");

function queryRequired(req, res, next) {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json({ msg: "Query is required." });
  } else {
    next();
  }
}

// This middleware will be used by ALL routes in THIS router
router.use(queryRequired);

// GET /search/
router.get("/", (req, res, next) => {
  //   console.log(req.headers);
  res.send("Search route check");
});

// GET /search/movie
// //localhost:3030/search/movie?api_key=123456789&query=Spider
router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter(movie => {
    let found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

// GET /search/person
// //localhost:3030/search/person?api_key=123456789&query=Keaton
router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = people.filter(person => {
    let found = person.name.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

module.exports = router;
