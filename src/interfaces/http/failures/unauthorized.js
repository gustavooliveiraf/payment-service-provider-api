const HttpStatus = require('http-status-codes');

const unauthorized = (req, res, details) => res.status(HttpStatus.UNAUTHORIZED).send({
  error: details,
  method: req.method,
  url: req.originalUrl,
});

module.exports = unauthorized;
