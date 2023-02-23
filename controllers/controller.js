const { fetchTopics, fetchArticles, fetchCommentsById } = require("../models/models.js")


exports.testConnection = (req, res, next) => {
  res.status(200).send({ message: "all ok" });
};

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
}

//6
exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    fetchCommentsById(article_id)

    .then((comments) => {
        res.status(200).send(comments)
    })
    .catch((err) => {
        next(err)
    })
}
