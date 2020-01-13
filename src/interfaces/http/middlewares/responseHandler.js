const { badRequest, notFound, unauthorized } = require('../failures');
const { devErrorHandler, errorHandler } = require('../errors');

const responseHandler = async (req, res, next) => {
  res.finish = (payload, status = 200) => res.status(status).send(payload);

  res.badRequest = (details) => badRequest(req, res, details);
  res.notFound = (details) => notFound(req, res, details);
  res.unauthorized = (details) => unauthorized(req, res, details);

  res.error = (error) => (process.env.NODE_ENV === 'development'
    ? devErrorHandler(req, res, error)
    : errorHandler(req, res, error));

  return next();
};

module.exports = responseHandler;
