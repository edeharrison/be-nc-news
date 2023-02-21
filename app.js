const express = require("express");
const { error404, error500 } = require("./controllers/error-handling-controller.js");
const app = express();

const {
  testConnection,
  getTopics,
  getArticles,
  getArticleById
} = require("./controllers/controller.js");

app.get("/api", testConnection);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

// Duplicate 404 functions. One here, one in ERCs. 
app.use((req, res, next) => {
  res.status(404).send( { message: "Path not found" } ) 
})

app.use(error404)
app.use(error500);

module.exports = app;
