const db = require("../../db/connection");

function fetchArticlesById(articleId) {

	return db
		.query('SELECT * FROM articles WHERE article_id=$1', [articleId])
		.then(({ rows }) => {
			if (!rows.length) {
                return Promise.reject({ status: 404, msg: "404: Article Not found" });
            }
              return rows[0];
		});
}

module.exports = { fetchArticlesById };
