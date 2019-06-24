const path = require("path");

const helmet = require("helmet");
const express = require("express");
const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, nex) => {
  console.log(req.body);
  res.render("index-rendring-test");
});

app.listen(3000, () => console.log("Started test"));
