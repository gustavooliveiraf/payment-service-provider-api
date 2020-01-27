const userRepositoryDefault = require('../../infra/repositories/orm/sequelize/user/find');

const findUser = (repository) => async (req, res, next) => {
  try {
    const {
      usedKey, key, infraVersion, env,
    } = req;
    const user = await repository.find(usedKey, key, infraVersion, env);

    return user;
  } catch (err) {
    if ((err.parent && err.parent.code === '22P02') // invalid uuid
      || err.message === 'ValidationError') return res.badRequest({ message: 'key inválida', invalid_key: 'api_key' });

    return next(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => findUser(arg1);
