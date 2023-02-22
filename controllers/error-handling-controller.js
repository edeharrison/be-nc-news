exports.customErrors = (err, req, res, next) => {
    if (err === 'no article or associated comments here' ||
        err === 'no article here') {
        res.status(404).send({ message: err });
    } else {
        res.status(404).send({ message: "Path not found" })
    }
    next(err)
}

exports.PSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02') {
        res.status(400).send({ message: 'Bad request' })
    }
}

exports.error500 = (err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error :(' })
}
