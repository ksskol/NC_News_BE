const { fetchComments } = require("../models/comments.models");
const { fetchArticlesById } = require("../models/article.models");

function getCommentsByArticleId(req, res, next) {
  const { article_id } = req.params;

  Promise.all([fetchComments(article_id), fetchArticlesById(article_id)])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCommentsByArticleId };
