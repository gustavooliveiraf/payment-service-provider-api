const database = require('../../../../infra/database/sequelize/models');
const formatDate = require('../utils/formatDate');

const findByEmail = async (email, infraVersion, env) => {
  const UserModel = database[infraVersion][env].User;

  let user = await UserModel.findOne({ where: { email } });

  if (!user) throw new Error('ValidationError'); // User does not exist

  user = formatDate(user, 'createdAt', 'updatedAt');

  return user.dataValues;
};

module.exports = {
  findByEmail,
};
