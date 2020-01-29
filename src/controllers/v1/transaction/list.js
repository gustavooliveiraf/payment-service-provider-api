const transactionRepository = require('../../../infra/repositories/orm/sequelize/transaction/findAll');
const transactionResponseModel = require('../../../domain/entities/transaction/list');

const list = (repository) => async (req, res, next) => {
  try {
    const {
      infraVersion, env, usedKey, key,
    } = req;

    const parameters = { usedKey, key, ...req.payload };

    const transactions = await repository.findAll(parameters, infraVersion, env);

    return res.finish(transactionResponseModel(transactions));
  } catch (err) {
    return next(err);
  }
};

module.exports = (arg1 = transactionRepository) => list(arg1);
