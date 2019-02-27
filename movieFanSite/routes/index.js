var express = require("express");
const request = require("request");

var router = express.Router();

/*
  Config:
    Set usingIMDBApi = true to use Movie IMDB API
    Set usingIMDBApi = false to use http://localhost:3030 Custom API
*/
const usingIMDBApi = false;

let apiKey = "";
let apiBaseUrl = "";
let nowPlayingUrl = "";
let imageBaseUrl = "";

if (usingIMDBApi) {
  const keys = require("../keys");
  apiKey = keys.apiKey;
  // const apiKey = "123456789";
  apiBaseUrl = "http://api.themoviedb.org/3";
  // const apiBaseUrl = "http://localhost:3030";
  nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
  // const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
  imageBaseUrl = "http://image.tmdb.org/t/p/w300";
} else {
  // const keys = require("../keys");
  // const apiKey = keys.apiKey;
  apiKey = "123456789";
  // const apiBaseUrl = "http://api.themoviedb.org/3";
  apiBaseUrl = "http://localhost:3030";
  // const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
  nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
  imageBaseUrl = "http://image.tmdb.org/t/p/w300";
}

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get("/", function(req, res, next) {
  // console.log(nowPlayingUrl);

  /*
    callback returns
    1 error
    2 http response
    3 json/data returned

    Note on response.body:
      Data returned may look like an object (in object format) but it is not an object.
      It is a "string" that is returned.
      Data accross an HTTP message always comes back as a string and
      needs to be parsed back into JSON.

  */
  request.get(nowPlayingUrl, (error, response, movieData) => {
    // console.log(response.rawHeaders);
    // console.log(response.body);  // This is a string!
    // console.log(movieData); // Same string result as response.body

    // You could also run against response.body
    // JSON.parse will convert the string to a JSON object
    const parsedData = JSON.parse(movieData); // movieData is an object and we are interested in the results array of movie objects
    // console.log(parsedData);

    // res.json(parsedData);
    res.render("index", { parsedData: parsedData.results });
  });

  // res.render("index", {});
});

router.get("/movie/:id", (req, res, next) => {
  // res.json(req.params.id); // check only
  const movieId = req.params.id;
  const thisMovieURL = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;

  // res.send(thisMovieURL); // check

  // Now need to issue a new HTTP request to the Movie API
  // Here we are acting as client to Movie Database API eventhough we are a server)
  // http://api.themoviedb.org/3/movie/{movie_id} > to GET movie details
  request.get(thisMovieURL, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData); // movieData returned is an object
    console.log(parsedData);
    res.render("single-movie", { parsedData });
  });
});

router.post("/search", (req, res, next) => {
  // res.send("check");

  // req.body because we are using a POST method and send data from a form
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat; // value of 'person' or 'movie'
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  // res.send(movieUrl); // check

  request.get(movieUrl, (error, response, movieData) => {
    let parsedData = JSON.parse(movieData);
    // res.json(parsedData); // check

    if (cat === "person") {
      parsedData.results = parsedData.results[0].known_for; // set to array of movies actor is known for
    }

    res.render("index", { parsedData: parsedData.results });
  });
});

module.exports = router;
