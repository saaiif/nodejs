const crypto = require("crypto");

const reqBodyParser = require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      const body = await reqBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" }); //201: mean data is created
      res.end(
        JSON.stringify({
          title: "Data posted successfully",
          message: "Added Successfully",
        })
      );
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" }); //201: mean data is created
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is invalid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
