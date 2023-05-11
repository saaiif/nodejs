/** Basic Get Structure */

module.exports = (req, res) => {
  const baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: "Validation failed", message: "Invalid UUID" })
    );
  } else if (regexV4.test(id)) {
    res.setHeader("Content-Type", "application/json");
    const filterMovies = req.movies.filter((movie) => movie.id === id);

    if (baseURL === "/api/movies/" && filterMovies?.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filterMovies));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ title: "Not Found", message: "No movie found" })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
