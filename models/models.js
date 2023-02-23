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

exports.fetchArticleById = (article_id) => {
  let queryString = `SELECT * FROM articles`;
  const queryParams = [];

  if (article_id !== undefined) {
    queryString += ' WHERE article_id = $1';
    queryParams.push(article_id);
  }

  return db.query(queryString, queryParams).then((result) => {
    const article = result.rows
    if (result.rowCount === 0) {
      return Promise.reject('no article here')
    }

    return article[0]
  });
};
