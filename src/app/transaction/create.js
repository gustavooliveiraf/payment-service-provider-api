const cardRepositoryDefault = require('../../infra/repositories/sequelize/register/card/create');
const transactionRepositoryDefault = require('../../infra/repositories/sequelize/transaction/create');
const payableRepositoryDefault = require('../../infra/repositories/sequelize/payable/create');

const transactionResponseModel = require('../../domain/responseModels/transaction/create');

const create = (transactionRepository, cardRepository, payableRepository) => async (req, res) => {
  try {
    const { infraVersion } = req;
    const { card, transaction, payable } = req.payload;

    const respCard = await cardRepository(card, infraVersion);

    const respTransaction = await transactionRepository(transaction, respCard.id, infraVersion);

    if (transaction.status === 'authorized') await payableRepository(payable, respTransaction.id, infraVersion);

    const resp = transactionResponseModel('transaction', transaction.authorizationCode, respCard, respTransaction);

    return res.finish(resp);
  } catch (err) {
    return res.error(err);
  }
};

module.exports = (arg1 = transactionRepositoryDefault, arg2 = cardRepositoryDefault,
  arg3 = payableRepositoryDefault) => create(arg1, arg2, arg3);
