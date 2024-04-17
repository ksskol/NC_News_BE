const db = require("../../db/connection");

function fetchArticlesById(articleId) {
  return db
    .query("SELECT * FROM articles WHERE article_id=$1", [articleId])
    .then(({ rows }) => {
      // If the article is not found, it rejects the promise with a message
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "404: Article Not Found" });
      }
      return rows[0];
    });
}

function fetchArticles() {
  return db
    .query(
      `SELECT 
				articles.article_id, 
				articles.title, 
				articles.topic, 
				articles.author,
				articles.created_at, 
				articles.votes, 
				articles.article_img_url,
				COUNT(comments.article_id) :: INT AS comment_count 
			FROM articles
			LEFT JOIN comments 
			ON comments.article_id = articles.article_id
			GROUP BY articles.article_id
			ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { fetchArticlesById, fetchArticles };
