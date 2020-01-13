const checkSetContentType = async (req, res, next) => {
  res.type('application/json');

  if (req.method !== 'GET' && !req.is('application/json')) {
    return res.fail('Content-Type should be application/json and request to have body.', 400);
  }

  return next();
};

module.exports = checkSetContentType;
