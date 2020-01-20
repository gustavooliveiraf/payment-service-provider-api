const database = require('../../../../../infra/database/orm/sequelize/models');
const statusEnum = require('../../../../database/enums/payable/status.js');

const create = async (payload, transactionId, infraVersion, env, transaction = false) => {
  const PayableModel = database[infraVersion][env].Payable;
  const statusId = statusEnum[payload.status];

  const model = await PayableModel.create({ ...payload, statusId, transactionId });

  if (transaction) return model;

  return (await model).dataValues;
};

module.exports = create;
