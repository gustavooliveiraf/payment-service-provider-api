/* eslint-disable max-len */
/* === dependency injection in the domain === */
const creditCardType = require('credit-card-type');
const clients = require('../../../services/clients');
/* === dependency injection in the domain === */

const businessRules = require('../../../domain/businessRules/transaction/create.js');
const sequelizeTransactionRepository = require('../../../infra/database/orm/sequelize/transactions/transaction/create');
const transactionResponseModel = require('../../../domain/responseModels/transaction/transaction');

const create = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env } = req;
    const { card, transaction, payable } = await businessRules(req.payload, creditCardType, clients);

    const payload = await repository.create()(card, transaction, payable, infraVersion, env);

    return res.finish(transactionResponseModel(payload.card, payload.transaction));
  } catch (err) {
    return next(err);
  }
};

module.exports = (arg1 = sequelizeTransactionRepository) => create(arg1);
