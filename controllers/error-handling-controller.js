exports.error404 = (err, req, res, next) => {
    res.status(404).send({ message: "Path not found" });
}

exports.PSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02') {
        res.status(400).send({ message: 'Bad request' })
    }
}

exports.error500 = (err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error :(' })
}
