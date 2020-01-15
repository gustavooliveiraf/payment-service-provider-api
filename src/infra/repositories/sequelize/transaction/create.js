const database = require('../../../../infra/database/sequelize/models');
const StatusEnum = require('../../../database/enums/transaction/status.js');

const create = async (payload, cardId, infraVersion) => {
  const TransactionModel = database[infraVersion].Transaction;
  const statusId = StatusEnum[payload.status];

  const transaction = await TransactionModel.create({ ...payload, statusId, cardId });

  return transaction.dataValues;
};

module.exports = create;
