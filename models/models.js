const db = require("../db/connection.js");

//3
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

//4
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

//5
exports.fetchArticleById = (article_id) => {
  let queryString = `SELECT * FROM articles`;
  const queryParams = [];

  if (article_id !== undefined) {
    queryString += " WHERE article_id = $1";
    queryParams.push(article_id);
  }

  return db.query(queryString, queryParams).then((result) => {
    const article = result.rows;
    if (result.rowCount === 0) {
      return Promise.reject("no article here");
    }

    return article[0];
  });
};

// 6
exports.fetchCommentsById = (article_id) => {
  // START - articles/10000/comments - article_id doesn't exist - throw 404
  return db
    .query(
      `
    SELECT * FROM articles
    WHERE article_id = $1
    ;
    `,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          message: "no article or associated comments here",
          status: 404,
        });
        // END - articles/10000/comments - article_id doesn't exist - throw 404
      } else {
        // happy path
        let queryString = `
        SELECT comment_id, votes, created_at, author, body, article_id 
        FROM comments
        `;
        const queryParams = [];

        if (article_id !== undefined) {
          queryString += ` WHERE article_id = $1 ORDER BY created_at DESC;`;
          queryParams.push(article_id);
        }

        return db.query(queryString, queryParams).then((result) => {
          const comments = result.rows;

          return comments;
        });
      }
    });
};

//7
exports.insertComment = (newComment, article_id) => {
  const { username, body } = newComment;

  if (username === undefined || body === undefined) {
    return Promise.reject({ message: "incomplete comment", status: 400 });
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

  return db
    .query(
      `
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING *
    ;
    `,
      [newComment.username, newComment.body, article_id]
    )
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    });
};
