const userRepositoryDefault = require('../../../infra/repositories/sequelize/user/find');
const {
  jwtGenerator,
  bcryptHashFuncs: { compare },
  message: { invalidUser },
} = require('../utils');

const formatResponse = (user, keys) => {
  const userTemp = { ...user };

  delete userTemp.id;
  delete userTemp.password;

  const token = jwtGenerator(keys);

  return {
    ...userTemp,
    token,
  };
};

const find = (repository) => async (req, res) => {
  try {
    const payload = req.user;

    const user = await repository.find('email', payload.email, req.infraVersion, req.env);

    if (!(await compare(payload.password, user.password))) {
      throw new Error('ValidationError');
    }

    const response = formatResponse(user, {
      apiKey: user.apiKey, encryptionKey: user.encryptionKey,
    });

    return res.finish(response);
  } catch (err) {
    if (err.message === 'ValidationError') {
      return res.badRequest({ message: invalidUser });
    }

    return res.error(err);
  }
};

module.exports = (arg1 = userRepositoryDefault) => find(arg1);
