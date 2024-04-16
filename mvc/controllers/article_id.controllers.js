const { fetchArticlesById } = require("../models/article_id.models");

function getArticlesById(req, res, next) {
  const { article_id } = req.params;

  return fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
}


module.exports = { getArticlesById };
