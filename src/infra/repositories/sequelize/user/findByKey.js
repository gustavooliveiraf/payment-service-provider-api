const database = require('../../../../infra/database/sequelize/models');

const findByKey = async (usedKey, keyValue, infraVersion, env) => {
  const UserModel = database[infraVersion][env].User;

  const user = await UserModel.findOne({
    where: { [usedKey]: keyValue },
  });

  if (!user) return user;

  return user.dataValues;
};

module.exports = {
  findByKey,
};
