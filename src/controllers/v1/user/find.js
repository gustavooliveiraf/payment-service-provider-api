const userRepositoryDefault = require('../../../infra/repositories/orm/sequelize/user/find');
const userModel = require('../../../domain/entities/user/user');
const { generateToken } = require('./utils');
const { hashFuncs: { compare } } = require('./utils');

const find = (repository) => async (req, res, next) => {
  try {
    const { infraVersion } = req;
    const { email, password } = req.user;

    const userTest = await repository.find('email', email, infraVersion, 'test');
    const userProd = await repository.find('email', email, infraVersion, 'prod');

    await compare(password, userTest.password);

    const { tokenTest, tokenProd } = generateToken(userTest, userProd);

    return res.finish(userModel(userTest, userProd, tokenTest, tokenProd));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: 'Usuário e/ou senha inválidos' });
    }

    return next(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => find(arg1);
