const userRepositoryDefault = require('../../../infra/repositories/orm/sequelize/user/find');
const userModel = require('../../../domain/responseModels/user/user');
const {
  jwtGenerator,
  bcryptHashFuncs: { compare },
  message: { invalidUser },
} = require('../utils');

const find = (repository) => async (req, res, next) => {
  try {
    const payload = req.user;

    const userTest = await repository.find('email', payload.email, req.infraVersion, 'test');
    const userProd = await repository.find('email', payload.email, req.infraVersion, 'prod');

    if (!(await compare(payload.password, userTest.password))) {
      throw new Error('ValidationError');
    }

    const tokenTest = jwtGenerator({
      apiKey: userTest.apiKey, encryptionKey: userTest.encryptionKey,
    });
    const tokenProd = jwtGenerator({
      apiKey: userProd.apiKey, encryptionKey: userProd.encryptionKey,
    });

    return res.finish(userModel(userTest, userProd, tokenTest, tokenProd));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: invalidUser });
    }

    return next(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => find(arg1);
