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
    const newComment = req.body
    insertComment(newComment)
    console.log(newComment)
    .then((comment) => {
        res.status(201).send(comment)
    })
    .catch((err) => {
        next(err)
    })
}