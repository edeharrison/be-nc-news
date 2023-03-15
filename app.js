const express = require("express");
const cors = require('cors');

const {
  customErrors,
  PSQLErrors,
  error500,
} = require("./controllers/error-handling-controller.js");
const app = express();
app.use(express.json())

const {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postComment,
  patchArticleVote,
  addComment,
  getUsers
} = require("./controllers/controller.js");

app.use(cors())

//3
app.get("/api/topics", getTopics);

//4
app.get("/api/articles", getArticles);

//5
app.get("/api/articles/:article_id", getArticleById)

//6
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

//7
app.post("/api/articles/:article_id/comments", postComment);

//8
app.patch("/api/articles/:article_id", patchArticleVote);
app.post("/api/articles/:article_id/comments", addComment)

//9
app.get("/api/users", getUsers)


app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(customErrors);
app.use(PSQLErrors);
app.use(error500);


module.exports = app;
