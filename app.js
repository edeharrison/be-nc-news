const express = require("express");
const { error500 } = require("./controllers/error-handling-controller.js");
const app = express();

const {
  testConnection,
  getTopics,
  getArticles,
} = require("./controllers/controller.js");

app.get("/api", testConnection);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.use((req, res, next) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(error500);

module.exports = app;
