const { fetchComments, insertComment } = require("../models/comments.models");
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

function postComment(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;

  return fetchArticlesById(article_id)
    .then(() => {
      return insertComment(article_id, username, body);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
        next(err); 
      });
}

module.exports = { getCommentsByArticleId, postComment };
