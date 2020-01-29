const database = require('../../../../../infra/database/orm/sequelize/models');
const paymentMethodEnum = require('../../../../database/enums/transaction/paymentMethod');
const invert = require('../../../../../domain/entities/utils/invert');

const paymentMethodEnumInvert = invert(paymentMethodEnum);

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

  if (!transaction) throw new Error('ValidationError'); // transaction does not exist // transaction does not exist

  transaction.dataValues.paymentMethod = paymentMethodEnumInvert[transaction.paymentMethodId];
  return transaction.dataValues;
};

module.exports = {
  findByPk,
};
