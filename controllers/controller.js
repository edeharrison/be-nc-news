const { fetchTopics } = require("../models/models.js")

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