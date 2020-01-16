const userRepositoryDefault = require('../../infra/repositories/sequelize/user/findOrCreate');
const {
  jwtGenerator,
  bcryptHashFuncs: { hash },
  message: { emailAlreadyExists },
} = require('../utils');

const formatResponse = (user) => {
  const userTemp = { ...user };

  delete userTemp.id;
  delete userTemp.password;

  const { apiKey, encryptionKey } = user;

  const token = jwtGenerator({ apiKey, encryptionKey });

  return {
    ...userTemp,
    token,
  };
};

const create = (repository) => async (req, res) => {
  try {
    req.user.password = await hash(req.user.password);

    const payload = { ...req.user };

    const user = await repository.findOrCreate(payload, req.infraVersion, req.env);

    return res.finish(formatResponse(user));
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: emailAlreadyExists });
    }

    return res.error(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => create(arg1);
