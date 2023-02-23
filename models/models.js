const db = require("../db/connection.js");

exports.fetchTopics = () => {
  return db
    .query(
    `
    SELECT * FROM topics;
    `
    )
    .then((result) => {
      return result.rows
    })
};

exports.fetchArticles = () => {
  return db
    .query(
    `
    SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url,
      CAST(COUNT(articles.article_id) AS INT) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC
    ;
    `
    )
    .then((result) => {
      return result.rows
    })
};

exports.insertComment = (newComment, article_id) => {
  const { username, body } = newComment

  if (username === undefined || body === undefined) {
    return Promise.reject({message: 'incomplete comment', status: 400})
  }

  // query to articles 
  // if exists > 
  // query to users
  // if exists >
    // insert into comments (existing, code below)

  // else
  // if article doesn't exist
    // Promise.reject (article not found)
  // if users doesn't exist
    // Promise.reject (users not found)

  return db.query(
    `
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING *
    ;
    `,
    [newComment.username, newComment.body, article_id]
  )
  .then((result) => {
    console.log(result.rows[0])
    return result.rows[0]
  })
}