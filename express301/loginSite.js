const path = require("path");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// req.query and below runs for every HTTP request.
app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = `Username/password does not exists.`;
  } else {
    res.locals.msg = ``;
  }

  next();
});

app.get("/", (req, res, next) => {
  res.send("Check");
});

app.get("/login", (req, res, next) => {
  // console.log(req.query);
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  const password = req.body.password;
  const username = req.body.username;

  // check db to validate user
  // if valid
  // save username in a cookie (stored in browser and browser will send to server every time a request is made).  Cookies are built in to express.
  // session data is stored on server and browser is given essentially a key for that data. (express-sessions are not included in express by default).
  // send to welcome page

  if (password === "s") {
    // .cookie('name of cookie', 'value')
    res.cookie("username", username);
    res.redirect("/welcome"); //default 302 Found
  } else {
    res.redirect("/login?msg=fail&test=hello");
  }

  // res.json(req.body);
});

app.get("/welcome", (req, res, next) => {
  res.render("welcome", {
    username: req.cookies.username
  });
});

// app.param('param to look for', callback); Usually placed at top before any routes.
// Before any route(s) below app.param() will look for any route with the specified param name
// :storyId, :blogId would be replaced with 'id'
app.param("id", (req, res, next, id) => {
  console.log("Params called:", id);
  // some logic if id for story..
  // some logic if id for blog..
  next();
});

/* Commented as example of routes with the same pattern and wildcard name 'id' for use with app.param() above
app.get("/story/:id", (req, res, next) => {
  res.send(`<h1>Story ${req.params.id}</h1>`);
});

app.get("/blog/:id", (req, res, next) => {
  res.send(`<h1>Blog ${req.params.id}</h1>`);
});
*/

// : wildcard, req.params
app.get("/story/:storyId", (req, res, next) => {
  res.send(`<h1>Story ${req.params.storyId}</h1>`);
});

// /story/:blogId will never run (without next()) as it matches above
app.get("/story/:blogId", (req, res, next) => {
  res.send(`<h1>Blog ${req.params.blogId}</h1>`);
});

app.get("/story/:storyId/:link", (req, res, next) => {
  res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`);
});

// res.sendFile() vs res.download()
app.get("/statement", (req, res, next) => {
  // res.send("<h1>Check</h1>");

  /*
    // Option 1: .sendFile().  However this causes the browser to load the image (ie this will render the statement in the browser unless this is what we want).
    // Note that in the response header 'content-type -> image/png'
    res.sendFile(
      path.join(__dirname, "userStatements/BankStatementChequing.png")
    );
  */

  // Option 2: res.download(1:filename, 2:optional name you want filename to download as, 3:callback)
  // Note - By using res.download(), Express is automatically setting the headers but you can set it manually shown below (see Option 4).
  // Note that in the response header we still have 'content-type -> image/png' but different
  // Content-Disposition -> attachment; filename="my-bank-statement.png"
  // The browser sees the Content-Disposition as an attachment and handles accordingly.
  // All we can do is set the headers and the different types of browser will now what to do based on the headers set following protocol.
  // This method uses res.sendFile() to transfer the file.
  res.download(
    path.join(__dirname, "userStatements/BankStatementChequing.png"),
    "mybankstatement.png",

    // Note you can call a callback once transfer is complete.
    // Note if there is an error in sending the file, headers may already be sent (ie
    // you only get one res with headers already sent).
    error => {
      // possible workaround if headers not already sent > use res.headerSent
      if (error) {
        // res.headerSent is a Boolean.  true if headers are already sent. (ie don't send them).
        if (!res.headersSent) {
          res.redirect("/download/error"); // Here we only try to redirect only if headers have not already been sent,
        }
      }
    }
  );

  /*
  // Option 3: res.attachment() does same thing but ONLY sets the headers for content-disposition to attachment and file name if provided
  res.attachment(
    path.join(__dirname, "/userStatements/BankStatementChequing.png")
    // "my-bank-statement.png"
  );

  res.set("Content-Type", "image/png");

  res.send();

    // Resource interpreted as Document but transferred with MIME type image/png: "http://localhost:3000/statement".
  
    */

  /*
    // Option 4: Manually set the header
    res.set("Content-Disposition", "attachment");
    res.sendFile(
      path.join(__dirname, "userStatements/BankStatementChequing.png"),
      "my-bank-statement.png"
    );
  */
});

app.get("/logout", (req, res, nex) => {
  // .clearCookie('name of cookie')
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000, () => console.log("Server started!"));
