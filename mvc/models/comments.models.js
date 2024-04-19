const db = require("../../db/connection");

function fetchComments(articleId) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [articleId]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function insertComment(article_id, username, body) {
  return db
    .query(
      `INSERT INTO comments 
            (article_id, author, body)
        VALUES 
             ($1, $2, $3) 
        RETURNING *;`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function deleteCommentById(comment_id){
  return db
    .query(
      `DELETE FROM comments WHERE comment_id=$1
    RETURNING *;`,
      [comment_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "404: Comment Id Not Found" });
      }
    });
};

module.exports = { fetchComments, insertComment, deleteCommentById};
