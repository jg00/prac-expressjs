const path = require("path");

const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public")); // remember if there was index.html here it will show first before res.render('index') in the views folder.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function validateUser(req, res, next) {
  // validated logic...
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get("/about", (req, res, next) => {
  res.render("about", {});
});

app.get("/", (req, res, next) => {
  console.log(res.locals);
  // res.render("indexPrac"); // uncomment practice only

  // Second argument is data to be sent to index.ejs
  // Note - the second argument is going to be appended to res.locals.
  res.render("index", {
    msg: "Failure!",
    msg2: "Success!",
    html:
      '<p><img src="http://www.rayfiore.com/_Media/315_med_hr.jpeg" width=200</img></p>'
  });
});

app.listen(3000, () => console.log("Server started!"));
