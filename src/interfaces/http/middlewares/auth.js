const userController = require('../../../controllers/auth/auth');

const getUser = async (req, res, next) => {
  const user = await userController()(req, res, next);

  req.user = {};
  req.user.id = user.id;

  if (!res.headersSent) return next();
};

module.exports = getUser;
