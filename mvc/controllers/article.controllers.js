const {
  fetchArticlesById,
  fetchArticles,
} = require("../models/article.models");

function getArticlesById(req, res, next) {
  const { article_id } = req.params;

  return fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticles(req, res, next) {
  return fetchArticles()
    .then((articles) => {
      return res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticlesById, getArticles };
