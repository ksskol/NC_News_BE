const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getEndpoints } = require("./controllers/api.controllers");
const { getArticlesById } = require("./controllers/article_id.controllers");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticlesById);

// General 404
app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "404: Not Found" })
  next()
});

// Custom errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

// Invalid input syntax 
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400: Bad Request" });
  }
  next(err);
});

// Generic 500: Internal Server Error 
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "500: Internal Server Error" });
});

module.exports = app;
