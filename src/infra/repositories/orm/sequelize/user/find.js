const database = require('../../../../../infra/database/orm/sequelize/models');
const formatDate = require('../utils/formatDate');

const find = async (key, value, infraVersion, env) => {
  const UserModel = database[infraVersion][env].User;

  let user = await UserModel.findOne({ where: { [key]: value } });

  if (!user) throw new Error('ValidationError'); // User does not exist

  user = formatDate(user, 'createdAt', 'updatedAt');

  return user.dataValues;
};

module.exports = {
  find,
};
