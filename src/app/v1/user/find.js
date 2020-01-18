const userRepositoryDefault = require('../../../infra/repositories/sequelize/user/find');
const userModel = require('../../../domain/responseModels/user/default');
const {
  jwtGenerator,
  bcryptHashFuncs: { compare },
  message: { invalidUser },
} = require('../utils');

const find = (repository) => async (req, res) => {
  try {
    const payload = req.user;

    const userTest = await repository.find('email', payload.email, req.infraVersion, 'test');
    const userProd = await repository.find('email', payload.email, req.infraVersion, 'prod');

    if (!(await compare(payload.password, userTest.password))) {
      throw new Error('ValidationError');
    }

    return res.finish(userModel(userTest, userProd, jwtGenerator));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: invalidUser });
    }

    return res.error(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => find(arg1);
