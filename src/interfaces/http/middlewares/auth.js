const userController = require('../../../app/auth/findUser');

const getUser = async (req, res, next) => {
  try {
    const user = await userController()(req.usedKey, req.key, req.infraVersion, req.environment);

    if (!user) return res.badRequest({ message: 'Key não existe ou expirada' });
    if (user.error) return res.badRequest({ message: user.message });

    req.user = {};
    req.user.id = user.id;

    return next();
  } catch (err) {
    return req.error(err);
  }
};

module.exports = getUser;
