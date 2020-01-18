const sequelizeTransaction = require('../../../infra/database/sequelize/transactions/transaction/create');

const transactionResponseModel = require('../../../domain/responseModels/transaction/create');

const create = (repository) => async (req, res) => {
  try {
    const { infraVersion, env } = req;
    const { card, transaction, payable } = req.payload;

    const payload = await repository.create()(card,
      transaction, payable, infraVersion, env);

    return res.finish(transactionResponseModel('transaction list', payload.card, payload.transaction));
  } catch (err) {
    return res.error(err);
  }
};

module.exports = (arg1 = sequelizeTransaction) => create(arg1);
