const database = require('../../../../../infra/database/orm/sequelize/models');
const formatDate = require('../utils/formatDate');

const findOrCreate = async (payload, infraVersion, env) => {
  const UserModel = database[infraVersion][env].User;

  const user = await UserModel.findOrCreate({
    where: {
      email: payload.email,
    },
    defaults: {
      ...payload,
    },
  });

  if (!user[1]) throw new Error('ValidationError'); // user already exists

  user[0] = formatDate(user[0], 'createdAt', 'updatedAt');

  return user[0].dataValues;
};

module.exports = {
  findOrCreate,
};
