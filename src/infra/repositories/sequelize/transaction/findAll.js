const database = require('../../../../infra/database/sequelize/models');
const usedKeyEnum = require('../../../database/enums/register/usedKey');

const findAll = async ({
  usedKey, key, count, page,
}, infraVersion, env) => {
  const TransactionModel = database[infraVersion][env].Transaction;
  const UserModel = database[infraVersion][env].User;
  const CardModel = database[infraVersion][env].Card;

  const usedKeyId = usedKeyEnum[usedKey];

  return TransactionModel.findAll({
    where: { usedKeyId },
    limit: count,
    offset: (page - 1) * count,
    order: [['createdAt', 'DESC']],
    include: [{
      model: UserModel,
      as: 'users',
      where: { [usedKey]: key },
      attributes: [],
    }, {
      model: CardModel,
      as: 'cards',
    }],
  });
};

module.exports = {
  findAll,
};
