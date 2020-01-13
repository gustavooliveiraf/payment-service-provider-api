const HttpStatus = require('http-status-codes');

const badRequest = (res, details) => res.fail(details, HttpStatus.BAD_REQUEST);

const notFound = (res, message) => res.fail({ message }, HttpStatus.NOT_FOUND);

const unauthorized = (res) => res.fail(
  { message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) },
  HttpStatus.UNAUTHORIZED,
);

const internalServerError = (res, err) => res.fail(
  { message: err.message, stack: err.stack },
  HttpStatus.INTERNAL_SERVER_ERROR,
);

module.exports = {
  badRequest,
  unauthorized,
  notFound,
  internalServerError,
};
