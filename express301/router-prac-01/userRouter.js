const express = require("express");
let router = express.Router();

function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}

router.use(validateUser);

// /user/login
router.get("/login", (req, res, next) => {
  console.log(res.locals.validated);
  res.send(`<h2>User Router - Login</h2>${res.locals.validated}`);
});

// /user/signup
router.get("/signup", (req, res, next) => {
  res.send("<h2>User Router - Signup</h2>");
});

// /user/
router.get("/", (req, res, next) => {
  console.log(res.locals.validated);
  res.send(`<h2>User Router - Main</h2>${res.locals.validated}`);
});

module.exports = router;
