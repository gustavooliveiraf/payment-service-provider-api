const userRepositoryDefault = require('../../../infra/repositories/orm/sequelize/user/findOrCreate');
const userModel = require('../../../domain/responseModels/user/user');
const { generateToken } = require('./utils');
const { hashFuncs: { hash } } = require('./utils');

const create = (repository) => async (req, res, next) => {
  try {
    req.user.password = await hash(req.user.password);

    const { user, infraVersion } = req;

    const userTest = await repository.findOrCreate(user, infraVersion, 'test');
    const userProd = await repository.findOrCreate(user, infraVersion, 'prod');

    const { tokenTest, tokenProd } = generateToken(userTest, userProd);

    return res.finish(userModel(userTest, userProd, tokenTest, tokenProd));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: 'E-mail já existente' });
    }

    return next(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => create(arg1);
