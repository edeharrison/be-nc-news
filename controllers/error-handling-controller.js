const db = require("../db/connection.js");

exports.error500 = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ message: 'Internal Server Error :(' })
}

