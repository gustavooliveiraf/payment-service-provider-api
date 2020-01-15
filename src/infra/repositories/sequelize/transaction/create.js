const database = require('../../../../infra/database/sequelize/models');
const StatusEnum = require('../../../database/enums/transaction/status');
const usedKeyEnum = require('../../../database/enums/register/usedKey');
const captureMethod = require('../../../../infra/database/enums/transaction/captureMethod');
const paymentMethod = require('../../../../infra/database/enums/transaction/paymentMethod');

const create = async (payload, cardId, infraVersion, environment) => {
  const TransactionModel = database[infraVersion][environment].Transaction;

  const statusId = StatusEnum[payload.status];
  const usedKeyId = usedKeyEnum[payload.usedKey];
  const captureMethodId = captureMethod[payload.captureMethod];
  const paymentMethodId = paymentMethod[payload.paymentMethod];

  const transaction = await TransactionModel.create({
    ...payload, cardId, statusId, usedKeyId, captureMethodId, paymentMethodId,
  });

  return transaction.dataValues;
};

module.exports = create;
