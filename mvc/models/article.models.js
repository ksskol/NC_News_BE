const db = require("../../db/connection");

function fetchArticlesById(articleId) {
  return db
    .query(`SELECT articles.*,
			COUNT (comments.article_id) :: INT AS comment_count
		FROM articles 
		LEFT JOIN comments 
		ON articles.article_id = comments.article_id
		WHERE articles.article_id = $1
		GROUP BY articles.article_id`,
      [articleId]
    )
    .then(({ rows }) => {
      // If the article is not found, it rejects the promise with a message
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "404: Article Not Found" });
      }
      return rows[0];
    });
}

function fetchArticles(topic) {
  let part_one = `SELECT 
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
			ON comments.article_id = articles.article_id`;

  let part_two = ` GROUP BY articles.article_id
  ORDER BY articles.created_at DESC`;

  const queryValues = [];

  if (topic) {
    part_one += ` WHERE topic=$1`;
    queryValues.push(topic);
  }

  part_one += part_two;

  return db.query(part_one, queryValues).then(({ rows }) => {
    return rows;
  });
}

function ifQueryExist(topic) {
  if (topic) {
    return db
      .query(`SELECT * FROM topics WHERE slug=$1`, [topic])
      .then(({ rows }) => {
        if (!rows.length) {
          return Promise.reject({ status: 400, msg: "400: Bad Request" });
        }
      });
  }
}

function updateVotes(article_id, inc_votes) {
  return db
    .query(
      `UPDATE articles
		SET votes = votes + $1
		WHERE article_id=$2
		RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = {
  fetchArticlesById,
  fetchArticles,
  updateVotes,
  ifQueryExist,
};
