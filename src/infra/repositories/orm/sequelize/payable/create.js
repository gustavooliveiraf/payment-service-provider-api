const database = require('../../../../../infra/database/orm/sequelize/models');
const statusEnum = require('../../../../database/enums/payable/status');

const create = async ({
  value, fee, paymentDate, status, transactionId,
}, { infraVersion, env }, transaction = false) => {
  const PayableModel = database[infraVersion][env].Payable;

  const model = await PayableModel.create({
    value, fee, paymentDate, statusId: statusEnum[status], transactionId,
  });

  if (transaction) return model;

  return (await model).dataValues;
};

module.exports = create;
