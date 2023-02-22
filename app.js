const express = require("express");
const {
  customErrors,
  PSQLErrors,
  error500,
} = require("./controllers/error-handling-controller.js");
const app = express();

const {
  testConnection,
  getTopics,
  getArticles,
  getArticleById,
} = require("./controllers/controller.js");

app.get("/api", testConnection);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(customErrors);
app.use(PSQLErrors);
app.use(error500);

module.exports = app;
