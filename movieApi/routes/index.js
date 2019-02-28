var express = require("express");
var router = express.Router();
const movies = require("../data/movies");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/most_popular", (req, res, next) => {
  // movies - is array of objects

  /*
    Get variables from query string
    api_key (required)
    page (optional)
 */

  let page = req.query.page;
  if (page === undefined) page = 1; // If undefined give default value of page=0

  // let elementsPerPage = 20; // Set page to contain 20 elements.
  let elementsPerPage = res.locals.elementsPerPage; // Set page to contain 20 elements.

  // Handled as middleware in app.js
  // if (req.query.api_key !== "123456789") {
  //   res.json("Invalid API Key");
  // } else {

  let results = movies.filter(movie => {
    return movie.most_popular;
  });

  // results = results.slice(page * 10 - 10, page * 10);
  results = results.slice(
    page * elementsPerPage - elementsPerPage,
    page * elementsPerPage
  );

  res.json({
    page, // You can include page number to the returned JSON
    results
  });

  /* 
       Note: res.json({results})

       In this case we want to return an object to match what 
       is returned by Movie IMDB API for GET /movie/now_playing.

       This is done so we do not break our rendered index.html when using Movie IMDB API.
    */
  // } Was for if statement above

  /*
  id: 211672
  id: 10193
  id: 324852
  id: 127380
  id: 269149
  id: 517141
  id: 93456
  id: 353486
  id: 809
  id: 8355
  */

  /* 
    .forEach
      runs on every single element

    .map
      runs on every single element but every element 
      will be pushed to an array

    .filter
      runs on every single element but only elements 
      that will be pushed into an array are those that meet the
      callback criteria
  */

  /*  Eample using .forEach instead of .filter

  const results = [];

  movies.forEach(movie => {
    if (movie.most_popular) {
      results.push(movie);
    }
  });
  
  res.json(results);
  */
});

module.exports = router;
