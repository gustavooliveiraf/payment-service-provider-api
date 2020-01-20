const userController = require('../../../app/auth/findUser');

const getUser = async (req, res, next) => {
  try {
    const user = await userController()(req.usedKey, req.key, req.infraVersion, req.env);

    if (!user) return res.badRequest({ message: 'Key inexistente' });
    if (user.error) return res.badRequest({ message: user.message });

    req.user = {};
    req.user.id = user.id;

    return next();
  } catch (err) {
    return res.error(err);
  }
};

module.exports = getUser;
