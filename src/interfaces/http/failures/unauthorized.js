const HttpStatus = require('http-status-codes');

const defaultRes = { message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) };

const unauthorized = (req, res, details = defaultRes) => res.status(HttpStatus.UNAUTHORIZED).send({
  error: {
    type: 'action_forbidden',
    ...details,
  },
  method: req.method,
  url: req.originalUrl,
});

module.exports = unauthorized;
