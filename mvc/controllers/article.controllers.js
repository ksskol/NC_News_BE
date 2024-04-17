const { fetchArticlesById, fetchArticles } = require("../models/article.models");

function getArticlesById(req, res, next) {
  const { article_id } = req.params;

  return fetchArticlesById(article_id)
      // If the article is fetched, send it in the response
      .then((article) => {
        res.status(200).send({ article });
      })
      // If an error occurs during fetching, pass it to the error-handling middleware
      .catch((err) => {
        next(err);
      })

}

function getArticles(req, res, next) {
  return fetchArticles().then((articles) => {
      return res.status(200).send({articles})
  })
  .catch((err) => {
      next(err)
  })
}

module.exports = { getArticlesById, getArticles };
