const express = require("express");
const { error500, PSQLErrors, error404 } = require("./controllers/error-handling-controller.js");
const app = express();

const {
  testConnection,
  getTopics,
  getArticles,
  getCommentsByArticleId
} = require("./controllers/controller.js");

app.get("/api", testConnection);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.all('/*', res => {
  res.status(404).send({ message: "Path not found" });
});

app.use(error404)
app.use(PSQLErrors)
app.use(error500);

module.exports = app;
