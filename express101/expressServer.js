// Native NodeJs module
const path = require("path");

// Express Server
const express = require("express");
const app = express();

app.use(express.static("public")); // Serve up static files.

app.all("/", (req, res) => {
  // Request
  console.log("A request was made to: " + req.url);

  // 1 Send HTML
  // res.send("<h1>This is the home page!</h1>");

  // 2 Send .html file
  console.log(path.join(__dirname, "node.html")); // /Users/userfolder/subfolder/subfolder/express101/node.html
  res.sendFile(path.join(__dirname, "node.html")); // To send file use .sendFile that requires absolute path where file is on machine and not relative to the server
});

// .all (any method type)
// '*' (any path)
app.all("*", (req, res) => {
  res.send("<h1>Page does not exists</h1>");
});

app.listen(3000, () => {
  console.log("Server started!");
});
