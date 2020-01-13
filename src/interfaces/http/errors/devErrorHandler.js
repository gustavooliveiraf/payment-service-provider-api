const HttpStatus = require('http-status-codes');

const internalServerError = (req, res, err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
  errors: { stack: err.stack },
  method: req.method,
  url: req.originalUrl,
});

module.exports = internalServerError;
