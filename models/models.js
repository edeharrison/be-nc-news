const db = require("../db/connection.js");

exports.fetchTopics = () => {
  return db
    .query(
      `
    SELECT * FROM topics;
    `
    )
    .then((result) => {
      return result.rows;
    });
};

// 4
exports.fetchArticles = () => {
  return db.query(
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

    return result.rows;
  });
};

// 6
exports.fetchCommentsById = (article_id) => {
  let queryString = 
    `
    SELECT comment_id, votes, created_at, author, body, article_id 
    FROM comments
    `
  const queryParams = []

  if (article_id !== undefined) {
    queryString += ` WHERE article_id = $1 ORDER BY created_at DESC;`
    queryParams.push(article_id)
  }

  return db.query(queryString, queryParams)
  .then((result) => {
    const comments = result.rows
    if (result.rowCount === 0) {
      return Promise.reject('no article or associated comments here')
    }

    return comments
  })
};
