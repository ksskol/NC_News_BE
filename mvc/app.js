const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getEndpoints } = require("./controllers/api.controllers");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

//errors
app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "404: Not Found" });
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "500: Internal Server Error" });
});

module.exports = app;
