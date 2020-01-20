const database = require('../../../../../infra/database/orm/sequelize/models');

const balance = async ({ userId }, infraVersion, env) => {
  const { Payable, sequelize } = database[infraVersion][env];
  const TransactionModel = database[infraVersion][env].Transaction;
  const UserModel = database[infraVersion][env].User;

  // impossible to perform: https://github.com/sequelize/sequelize/issues/3920

  return Payable.findAll({
    raw: true,
    attributes: {
      include: [[sequelize.fn('SUM', sequelize.col('payable.value')), 'balance']],
      exclude: ['fee', 'payable.id', 'paymentDate', 'statusId', 'transactionId', 'createdAt', 'updatedAt', 'value'],
    },
    include: {
      raw: true,
      model: TransactionModel,
      as: 'transaction',
      attributes: [],
      required: true,
      include: {
        raw: true,
        model: UserModel,
        as: 'users',
        where: { id: userId },
        attributes: [],
      },
    },
  });
};

module.exports = {
  balance,
};
