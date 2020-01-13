const HttpStatus = require('http-status-codes');

const badRequest = (req, res, details) => res.status(HttpStatus.BAD_REQUEST).send({
  errors: details,
  method: req.method,
  url: req.originalUrl,
});

module.exports = badRequest;
