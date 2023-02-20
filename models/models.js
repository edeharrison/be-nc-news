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
    JOIN comments
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

