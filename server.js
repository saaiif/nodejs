const http = require("http");

// Import to use process.env
require("dotenv").config();

const movies = require("./data/movies.json");

const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const deleteReq = require("./methods/delete-request");
const putRequest = require("./methods/put-request");

// Define PORT
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server  is running on:${PORT}`);
});
