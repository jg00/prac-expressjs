const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(express.static("public"));
app.use(express.json()); // data may be passed as 'application/json' mime type
app.use(express.urlencoded({ extended: false })); // data may be passed as (usually by default) 'application/x-www-form-urlencoded' mime type usually.  .urlencoded parses this data for us and puts it inside req.body.  Otherwise req.body will be empty object {}.

app.post("/ajax", (req, res) => {
  console.log(req.headers); // req.headers here can be used to show what the mime type is and this shows why we need .urlencoded b/c of 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  console.log(req.body); // note express.json() and/or express.urlencoded() 'creates' req.body property otherwise 'undefined' is returned.

  // Responding with res.send() vs res.json()
  // res.send("Test"); // by default is going to set mime type of text/html'
  res.json(["Test", 1, 2, 3]); // if we switch to res.json this is now going to change the mime type to 'application/json'
});

app.listen(3000, () => console.log("Server started!"));

/*
    note:
    Because we have ajax.html inside of public folder it will automatically load
    just by going to localhost:3000/ajax.html

    The ajax call will then be made to the '/ajax' post route above specified in the 'url' property of the ajax call.

    Review:
    Initial HTTP request > http://localhost:3000/ajax.html
    Handled by app.use(express.static("public"));
    Browser get the file ajax.html and DOM is loaded
    Script then runs which is another new HTTP request (ie the ajax POST request).
    POST is handled by app.post('ajax', (req,res) => {.. res.send('Test')})
        However,
        res.send('Test') is not returning a valid response back. Why?
        Using Postman simulate a POST to http://localhost:3000/ajax with header Content Type of application/x-www-form-urlencoded.
        Now in the response body we get 'Test' becasue of res.send('Test').
        But in the response header we get a Content-Type (mime type) of text/html; charset=utf-8.
        Our ajax promise will not accept or does not know what to do 'text/html' (ie not a valid data type) and
        therefore does not resolve the ajax promise.
        To resolve we need to use res.json(body).
        res.json(body) sends a JSON response.  This method sends a response (with the correct content-type)
        that is the parameter converted to a JSON string using JSON.stringify().

        res.send("Test"); // by default is going to set mime type of text/html'
        res.json("Test"); // if we switch to res.json this is now going to change the mime type to 'application/json' 

        By switching to res.json('Test') we will now see the response in the browser console because
        the ajax promise resolve is okay accepting 'application/json'.  (Axios is the same as well any other HTTP client).

        Anytime you usually respond with json you use res.json.
        Anytime you respond with an html you use res.render.

*/
