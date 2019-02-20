// Node/HTTP Sever
// curl -v www.google.com (-v verbose) for sample HTTP Reques/Response message
// 'http' module native to NodeJS.

/*
    HTTP Request Message
    1 start-line -> GET(method)  /blog(path)   HTTP/1.1(protocol)
    2 header (metadata) -> key:value pairs. ex: mime type -> {content-type:text/html}
    blank line
    3 body (content) -> HTML, binary data, etc.  GET request would not have a body.

    HTTP Response Message
    1 start-line -> HTTP/1.1(protocol)  404 Not Found(status)
    2 header (metadata) -> key:value pairs. ex: mime type object -> {content-type:text/html}
    blank line
    3 body (content) -> HTML, binary data, etc.
*/

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Request
  console.log("A request was made to: " + req.url);
  // Response - curl -v localhost:3000

  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const homePageHTML = fs.readFileSync("node.html");
    // console.log(homePageHTML); // <Buffer 89...
    res.write(homePageHTML);
    res.end();
  } else if (req.url === "/node.png") {
    res.writeHead(200, { "content-type": "image/png" });
    const image = fs.readFileSync("node.png");
    // console.log(image); // <Buffer 3c...
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    const css = fs.readFileSync("styles.css");
    res.write(css);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h4>Page your are looking for not found.</h4>");
    res.end();
  }
});

server.listen(3000);
