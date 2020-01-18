const userRepositoryDefault = require('../../../infra/repositories/sequelize/user/findOrCreate');
const userModel = require('../../../domain/responseModels/user/default');
const {
  jwtGenerator,
  bcryptHashFuncs: { hash },
  message: { emailAlreadyExists },
} = require('../utils');

const create = (repository) => async (req, res) => {
  try {
    req.user.password = await hash(req.user.password);

    const { user, infraVersion } = req;

    const userTest = await repository.findOrCreate(user, infraVersion, 'test');
    const userProd = await repository.findOrCreate(user, infraVersion, 'prod');

    return res.finish(userModel(userTest, userProd, jwtGenerator));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: emailAlreadyExists });
    }

    return res.error(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => create(arg1);
