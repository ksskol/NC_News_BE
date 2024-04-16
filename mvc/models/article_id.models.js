const db = require("../../db/connection");

function fetchArticlesById(articleId) {

	return db
		.query('SELECT * FROM articles WHERE article_id=$1', [articleId])
		.then(({ rows }) => {
            // If the article is not found, it rejects the promise with a message
			if (!rows.length) {
                return Promise.reject({ status: 404, msg: "404: Article Not found" });
            }// If an article is found, return the first (and only) row 
              return rows[0];
		});
}

module.exports = { fetchArticlesById };
