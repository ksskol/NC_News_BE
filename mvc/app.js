const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getEndpoints } = require("./controllers/api.controllers");
const { getArticlesById } = require("./controllers/article_id.controllers");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticlesById);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "404: Not Found" })
  next()
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err)
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400: Bad Request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "500: Internal Server Error" });
});

module.exports = app;
