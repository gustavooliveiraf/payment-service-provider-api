/* eslint-disable max-len */
/* === dependency injection in the domain === */
const creditCardType = require('credit-card-type');
const clients = require('../../../services/clients');
/* === dependency injection in the domain === */

const businessRules = require('../../../domains/businessRules/transaction/create');
const sequelizeTransactionRepository = require('../../../infra/repositories/orm/sequelize/databaseTransactions/transaction/create');
const transactionResponseModel = require('../../../domains/entities/transaction/transaction');

const create = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env } = req;
    const { card, transaction, payable } = await businessRules(req.payload, creditCardType, clients);

    const payload = await repository.create()(card, transaction, payable, infraVersion, env);

    return res.finish(transactionResponseModel(payload.card, payload.transaction));
  } catch (err) {
    if (err.message === 'cardNumber inválido' || err.message === 'cardCvv inválido') {
      return res.badRequest({ message: err.message, invalid_key: err.invalid_key });
    }
    if (err.message === 'Bandeira não aceita') {
      return res.badRequest({ message: err.message });
    }

    return next(err);
  }
};

module.exports = (arg1 = sequelizeTransactionRepository) => create(arg1);
