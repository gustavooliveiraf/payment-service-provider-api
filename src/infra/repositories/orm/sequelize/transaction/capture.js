const database = require('../../../../../infra/database/orm/sequelize/models');

const capture = async ({ id, value, refuseReason }, { infraVersion, env }) => {
  const TransactionModel = database[infraVersion][env].Transaction;

  const transaction = await TransactionModel.update({
    capture: true,
    capturedValue: value,
    refuseReason,
  }, {
    where: { id },
  });

  return (await transaction).dataValues;
};

module.exports = {
  capture,
};
