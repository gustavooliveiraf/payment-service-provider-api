const userRepositoryDefault = require('../../infra/repositories/sequelize/user/find');

const findUser = (repository) => async (usedKey, keyValue, infraVersion, env) => {
  try {
    const user = await repository.find(usedKey, keyValue, infraVersion, env);

    return user;
  } catch (err) {
    if ((err.parent && err.parent.code === '22P02')
      || err.message === 'ValidationError') return { error: true, message: 'Key inválida' };

    return { error: true, message: err.message };
  }
};

module.exports = (arg1 = userRepositoryDefault) => findUser(arg1);
