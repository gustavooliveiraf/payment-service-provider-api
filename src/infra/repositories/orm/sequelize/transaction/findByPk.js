const database = require('../../../../../infra/database/orm/sequelize/models');

const findByPk = async (id, infraVersion, env) => {
  const TransactionModel = database[infraVersion][env].Transaction;
  const CardModel = database[infraVersion][env].Card;
  const PayableModel = database[infraVersion][env].Payable;
  const UserModel = database[infraVersion][env].User;

  // const transaction = await TransactionModel.findByPk(id);

  const transaction = await TransactionModel.findByPk(id, {
    include: [{
      model: UserModel,
      as: 'users',
      attributes: ['id'],
    }, {
      model: CardModel,
      as: 'cards',
    }, {
      model: PayableModel,
      as: 'payables',
    }],
  });

  if (!transaction) throw new Error('ValidationError'); // transaction does not exist

  return transaction.dataValues;
};

module.exports = {
  findByPk,
};
