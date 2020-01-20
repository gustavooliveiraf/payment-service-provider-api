const database = require('../../../../../infra/database/orm/sequelize/models');

const findAll = async ({ userId, count, page }, infraVersion, env) => {
  const PayableModel = database[infraVersion][env].Payable;
  const TransactionModel = database[infraVersion][env].Transaction;
  const UserModel = database[infraVersion][env].User;

  return PayableModel.findAll({
    limit: count,
    offset: (page - 1) * count,
    order: [['createdAt', 'DESC']],
    include: {
      model: TransactionModel,
      as: 'transaction',
      attributes: [],
      required: true,
      include: {
        model: UserModel,
        as: 'users',
        where: { id: userId },
        attributes: [],
      },
    },
  });
};

module.exports = {
  findAll,
};
