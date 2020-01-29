const database = require('../../../../../infra/database/orm/sequelize/models');

const create = async ({
  value, fee, paymentDate, statusId, transactionId,
}, { infraVersion, env }, transaction = false) => {
  const PayableModel = database[infraVersion][env].Payable;

  const model = await PayableModel.create({
    value, fee, paymentDate, statusId, transactionId,
  });

  if (transaction) return model;

  return (await model).dataValues;
};

module.exports = create;
