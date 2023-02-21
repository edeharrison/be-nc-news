const { fetchTopics, fetchArticles } = require("../models/models.js")

exports.testConnection = (req, res, next) => {
    res.status(200).send({ message: 'all ok' })
}

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles) => {
        res.status(200).send(articles)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getCommentsByArticleId = (req, res, next) => {
    fetchCommentsById(article_id)
    .then((comments) => {
        res.status(200).send(comments)
    })
}