const authController = require('../../../controllers/auth/auth');

const getUser = async (req, res, next) => {
  const user = await authController()(req, res, next);

  req.user = {};
  req.user.id = user.id;

  if (!res.headersSent) return next();
  return null;
};

module.exports = getUser;
