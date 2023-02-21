const db = require("../db/connection.js");

exports.error500 = (err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error :(' })
}

