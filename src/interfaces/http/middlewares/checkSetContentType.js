const checkSetContentType = async (req, res, next) => {
  res.type('application/json');
  const bodyLength = Object.keys(req.body).length;

  if (req.method !== 'GET' && !req.is('application/json') && bodyLength > 0) {
    return res.badRequest({ message: 'Content-Type should be application/json' });
  }

  return next();
};

module.exports = checkSetContentType;
