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
      return result.rows;
    });
};

exports.fetchCommentsById = (article_id) => {
  console.log(article_id)
  // const article_id = req.params
  return db.query(
    `
    SELECT * FROM comments
    WHERE article_id = 1
    ;
    `
  )
  .then((result) => {
    console.log(result)
    return result.rows
  })
};
