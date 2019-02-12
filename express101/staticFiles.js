// Serve static files.
const express = require("express");
const app = express();

app.use(express.static("public"));
// app.use(express.static("node_modules"));  // Multiple folders allowed

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the home page!</h1>");
});

app.listen(3000, () => {
  console.log("Server started!");
});
