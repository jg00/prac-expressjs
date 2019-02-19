const express = require("express");
let router = express.Router(); // creates a new router object

// works like app.use but router.use is specific to this router
// router.use()

router.get("/", (req, res, next) => {
  res.json({
    msg: "The Router works!"
  });
});

/*
router.all
router.post
router.delete
router.put
router...
*/

module.exports = router;
