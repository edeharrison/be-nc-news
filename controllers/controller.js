
const {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchCommentsById,
  insertComment,
  updateArticleVote,
  fetchUsers
} = require("../models/models.js")

//3
exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch((err) => {
      next(err);
    });
};

//4
exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

//5
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
};

//6
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsById(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

//7
exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  insertComment(newComment, article_id)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};

//8
exports.patchArticleVote = (req, res, next) => {
  const { article_id } = req.params;
  const newVote = req.body;
  updateArticleVote(article_id, newVote)
    .then((result) => {
      res.status(200).send(result);
    })

    .catch((err) => {
      next(err);
    });
  };
}

//9
exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => {
        res.status(200).send(users)
    })
    .catch((err) => {
        next(err)
    })
}

