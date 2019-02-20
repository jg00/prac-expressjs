const express = require("express");
let router = express.Router();

function valdiateUser(req, res, next) {
  res.locals.validated = true;
  console.log("validated user");
  next();
}

// validateUser middleware is added ONLY added to this router
router.use(valdiateUser);

// /user/
router.get("/", (req, res, next) => {
  console.log("locals:", res.locals);
  res.json({
    msg: "User Router Works!"
  });
});

module.exports = router;
