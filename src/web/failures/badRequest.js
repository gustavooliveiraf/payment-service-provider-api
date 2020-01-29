const HttpStatus = require('http-status-codes');

const badRequest = (req, res, details) => res.status(HttpStatus.BAD_REQUEST).send({
  error: {
    ...details,
    type: 'invalid_parameter',
  },
  method: req.method,
  url: req.originalUrl,
});

module.exports = badRequest;
