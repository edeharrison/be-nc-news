const { fetchTopics, fetchArticles, insertComment } = require("../models/models.js")

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

exports.addComment = (req, res, next) => {
    const { article_id } = req.params
    const newComment = req.body
    // console.log(newComment)
    insertComment(newComment, article_id)
    .then((comment) => {
        res.status(201).send(comment)
    })
    .catch((err) => {
        next(err)
    })
}