var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const date = new Date(1969, 6, 20);

  // -- Cache request directives --

  /*
    1 Requestor is saying it will use a cache resource for this long.
  */
  // req.set('Cache-Control', 'max-age=120')

  /*
    2 If the client is willing to accept something that is stale (ie past expiration)
    , then max-stale is how far past state the client is willing to accept beyond the expiration.
  
    Requestor could say I will accepst a stale resource (web page, json, etc.) 
    for a day (hr, seconds, etc) past the expiration.
  */
  // req.set('Cache-Control', 'max-stale=120')

  /*
    3 Other cache request directives
    min-fresh > means has to be at least this fresh

    no-cache > means the requestor is going to expect some kind of validation to make sure I
    don't want to use a cache unless there is absolutely no reason for me to get a new one

    no-store > means I am not going to store anything about this.  I am not
    going to keep any data.

    fresh and stale > these belong to the request object meaning the requestor
    is letting you know how old this thing is.
      console.log(req.fresh) > fresh returns true if it's not stale
      console.log(req.stale) > if stale run some logic
  */

  // console.log(req.fresh);
  // console.log(req.stale);

  console.log(req.accepts(["json", "html"])); // returns 'html' b/c it is accepted or it will return false

  // -- Cache response directives (Here you are the server) --

  /*
    public (ex: cache for everyone) >
    ex:  Lets say you get some ejs and instead of compiling that ejs every
    single time, if it is always the same, why not run it one time, cache 
    the result html, css, js, and send that cache every single time.

    private (ex: cache for specific user)
  */

  res.set("Date", date);

  res.set("Content-Type", "text/html");
  // res.type("text/html")   // Same as above

  /*
    There will not be a cached copy on the browser to use anymore
    Usually for testing so you do not have to do a
    "Empty Cache and Hard Reload"
  */

  res.set({ "Cache-Control": "no-store", "Content-Length": "123" });

  console.log(res.get("Content-Type"));
  res.render("index", { title: "Express" });
});

module.exports = router;
