const database = require('../../../../infra/database/sequelize/models');
const statusEnum = require('../../../database/enums/payable/status.js');

const create = async (payload, transactionId, infraVersion, environment) => {
  const PayableModel = database[infraVersion][environment].Payable;
  const statusId = statusEnum[payload.status];

  const payable = await PayableModel.create({ ...payload, statusId, transactionId });

  return payable.dataValues;
};

module.exports = create;
