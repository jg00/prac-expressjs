const express = require("express");
let router = express.Router(); // creates a new router object

// Router works same way app router does, it's just this is specific to this router.
// app.get() works same as router.get()

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
