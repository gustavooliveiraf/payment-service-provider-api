const userRepositoryDefault = require('../../../infra/repositories/orm/sequelize/user/findOrCreate');
const userModel = require('../../../domain/responseModels/user/user');
const {
  jwtGenerator,
  bcryptHashFuncs: { hash },
  message: { emailAlreadyExists },
} = require('../utils');

const create = (repository) => async (req, res, next) => {
  try {
    req.user.password = await hash(req.user.password);

    const { user, infraVersion } = req;

    const userTest = await repository.findOrCreate(user, infraVersion, 'test');
    const userProd = await repository.findOrCreate(user, infraVersion, 'prod');

    const tokenTest = jwtGenerator({
      apiKey: userTest.apiKey, encryptionKey: userTest.encryptionKey,
    });
    const tokenProd = jwtGenerator({
      apiKey: userProd.apiKey, encryptionKey: userProd.encryptionKey,
    });

    return res.finish(userModel(userTest, userProd, tokenTest, tokenProd));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: emailAlreadyExists });
    }

    return next(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => create(arg1);
