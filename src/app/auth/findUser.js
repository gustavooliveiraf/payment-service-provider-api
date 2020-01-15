const userRepositoryDefault = require('../../infra/repositories/sequelize/user/findByKey');

const findUser = (repository) => async (usedKey, key, infraVersion, environment) => {
  try {
    const user = await repository.findByKey(usedKey, key, infraVersion, environment);

    return user;
  } catch (err) {
    if (err.parent.code === '22P02') return { error: true, message: 'Key inválida' };

    return { error: true, message: err.message };
  }
};

module.exports = (arg1 = userRepositoryDefault) => findUser(arg1);
