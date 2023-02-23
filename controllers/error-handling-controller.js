exports.customErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({message: `${err.message}`})
  }

  // update this model, then compile this into above if block
  if (err === "no articles here") {
    res.status(404).send({ message: err });
  } else {
    next(err);
  }
}

exports.PSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02') {
        res.status(400).send({ message: 'Bad request' })
    }
}

// 
exports.error500 = (err, req, res, next) => {
    // handy (and allowed) to include following console.log
    console.log(err)
    res.status(500).send({ message: 'Internal Server Error :(' })
}
