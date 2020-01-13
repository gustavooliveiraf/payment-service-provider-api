const database = require('../../../../infra/database/sequelize/models');
const formatDate = require('../utils/formatDate');

const create = async (payload, infraVersion) => {
  const TransactionModel = database[infraVersion].Transaction;

  let transaction = await TransactionModel.create(payload);

  transaction = formatDate(transaction, 'createdAt', 'updatedAt');

  return transaction.dataValues;
};

module.exports = {
  create,
};
