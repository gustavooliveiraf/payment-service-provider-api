const HttpStatus = require('http-status-codes');

const defaultRes = HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED);

const unauthorized = (req, res, message = defaultRes) => res.status(HttpStatus.UNAUTHORIZED).send({
  // logStash(
  error: {
    type: 'action_forbidden',
    message,
  },
  method: req.method,
  url: req.originalUrl,
});

module.exports = unauthorized;
