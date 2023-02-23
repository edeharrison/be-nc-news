const express = require("express");

const { customErrors, error500, PSQLErrors } = require("./controllers/error-handling-controller.js");

const app = express();

//

const {
  testConnection,
  getTopics,
  getArticles,
  getCommentsByArticleId,
  getArticleById,
} = require("./controllers/controller.js");

app.get("/api", testConnection);

app.get("/api/topics", getTopics);

//4
app.get("/api/articles", getArticles);


//6
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.all('/*', res => {
  res.status(404).send({ message: "Path not found" });
});

app.use(customErrors)
app.use(PSQLErrors)

app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(customErrors);
app.use(PSQLErrors);
app.use(error500);

module.exports = app;
