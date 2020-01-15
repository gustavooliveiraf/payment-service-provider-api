const database = require('../../../../infra/database/sequelize/models');

const findByKey = async (usedKey, keyValue, infraVersion, environment) => {
  const UserModel = database[infraVersion][environment].User;

  const user = await UserModel.findOne({
    where: { [usedKey]: keyValue },
  });

  if (!user) return user;

  return user.dataValues;
};

module.exports = {
  findByKey,
};
