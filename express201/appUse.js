// Middleware function is any function that has access to the req, res, next object.
const express = require("express");
const app = express();

function validateUser(req, res, next) {
  // res object has a property called 'locals'.  res.locals is an object
  // that contains response local variables scoped to the request
  res.locals.validated = true;
  console.log("VALIDATED RAN!");
  next();
}

app.use(validateUser); // This function is going to run everytime an HTTP request is made

/*
  notes:
  app.use(validateUser); // Will run validateUser on all routes, all methods
  app.use("/admin", validateUser); // Will run validateUser on /admin route, all methods
  app.get("/", validateUser); // Will run validateUser on / route, only on GET method
*/

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
  console.log(res.locals.validated);
});

app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>");
  console.log(res.locals.validated);
});

app.listen(3000, () => {
  console.log("Server started!!");
});
