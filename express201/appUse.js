// Middleware function is any function that has access to the req, res, next object.
const express = require("express");
const app = express();

function validateUser(req, res, next) {
  // res object property 'locals'.
  res.locals.validated = true;
  res.next();
}

app.use(validateUser); // This function is going to run everytime an HTTP request is made

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
  console.log("VALIDATED RAN!");
  next();
});

app.listen(3000, () => {
  console.log("Server started!!");
});
