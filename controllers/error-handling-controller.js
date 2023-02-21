exports.error404 = (err, req, res, next) => {
  res.status(404).send({ message: "Path not found" });
}

exports.error500 = (err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error :(' })
}



