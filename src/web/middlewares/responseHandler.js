const { badRequest, notFound, unauthorized } = require('../failures');

const responseHandler = async (req, res, next) => {
  res.finish = (payload, status = 200) => res.status(status).send(payload);

  res.badRequest = (details) => badRequest(req, res, details);
  res.notFound = (details) => notFound(req, res, details);
  res.unauthorized = (details) => unauthorized(req, res, details);

  return next();
};

module.exports = responseHandler;
