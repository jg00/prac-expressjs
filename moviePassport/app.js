var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");
const session = require("express-session");

// ============ Passport Files ============ //
const passportConfig = require("./config");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
// console.log(GitHubStrategy);
// ======================================== //

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());

app.use(
  session({
    secret: "well well well",
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true } // default
  })
);

// ============ Passport Config ============ //
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(passportConfig, function(
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    // This is everything that GitHub is willing to share about the user
    // Howerver, more things need to be done like - return cb(), passport.initialize(),
    // passport.session(), passport.serialize(), passport.deserialize()
    // At the end passport will restore to "req.user" which we can
    // console.log at router.get('/') as an example.
    // console.log(profile);

    // return cb(err, user); // from strategy documentation
    return cb(null, profile);
  })
);

/*
  Note that the callback in passport.use(passportConfig, funct..) will be called 
  after the user has given permission to share the user profile into to our application.
  After user gives permission it will send back 
  accessToken, refreshToken, profile (ie the GitHub profile), cb (a callback).

  This function(accessToken, refreshToken, profile, cb) << This is the verify callback.
  The cb 'must' be called in order to complete authentication.
*/

// Becuase of the way data is stored inside of a session it needs to be serialized/deserialized
// Once everything is serialized, everything is restored to "req.user".
// Passport is creating "req.user"
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// ========================================= //

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
