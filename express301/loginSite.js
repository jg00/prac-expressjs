const path = require("path");
const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.send("Check");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  const password = req.body.password;
  const username = req.body.username;

  // check db to validate user
  // if valid
  // save username in a cookie (stored in browser and browser will send to server every time a request is made).  Cookies are built in to express.
  // session data is stored on server and browser is given essentially a key for that data. (express-sessions are not included in express by default).
  // send to welcome page

  if (password === "password") {
    // .cookie('name of cookie', 'value')
    res.cookie("username", username);
    res.redirect("/welcome");
  }

  //   res.json(req.body);
});

app.get("/welcome", (req, res, next) => {
  res.send("Welcome!");
});

app.listen(3000, () => console.log("Server started!"));
