const db = require("../db/connection.js");

exports.error500 = (err, req, res, next) => {
    console.log('here')
    res.status(500).send({ message: 'Internal Server Error :(' })
}

