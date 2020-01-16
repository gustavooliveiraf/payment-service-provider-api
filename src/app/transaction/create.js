/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const sequelizeTransaction = require('../../infra/database/sequelize/transactions/transaction/create');

const transactionResponseModel = require('../../domain/responseModels/transaction/create');

const create = () => async (req, res) => {
  try {
    const { infraVersion, env } = req;
    const { card, transaction, payable } = req.payload;

    const payload = await sequelizeTransaction()(card,
      transaction, payable, infraVersion, env);

    const resp = transactionResponseModel('transaction',
      transaction.authorizationCode, transaction.usedKey, payload.card, payload.transaction);

    return res.finish(resp);
  } catch (err) {
    return res.error(err);
  }
};

module.exports = () => create();
