const database = require('../../../../../infra/database/orm/sequelize/models');
const StatusEnum = require('../../../../database/enums/transaction/status');
const usedKeyEnum = require('../../../../database/enums/register/usedKey');
const captureMethod = require('../../../../database/enums/transaction/captureMethod');
const paymentMethod = require('../../../../database/enums/transaction/paymentMethod');

const create = async (payload, cardId, infraVersion, env, transaction = false) => {
  const TransactionModel = database[infraVersion][env].Transaction;

  const statusId = StatusEnum[payload.status];
  const usedKeyId = usedKeyEnum[payload.usedKey];
  const captureMethodId = captureMethod[payload.captureMethod];
  const paymentMethodId = paymentMethod[payload.paymentMethod];

  const model = TransactionModel.create({
    ...payload, cardId, statusId, usedKeyId, captureMethodId, paymentMethodId,
  });

  if (transaction) return model;

  return (await model).dataValues;
};

module.exports = create;
