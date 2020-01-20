const transactionRepository = require('../../../infra/repositories/orm/sequelize/transaction/findAll');
const transactionResponseModel = require('../../../domain/responseModels/transaction/list');

const list = (repository) => async (req, res) => {
  try {
    const {
      infraVersion, env, usedKey, key,
    } = req;

    const parameters = { usedKey, key, ...req.payload };

    const transactions = await repository.findAll(parameters, infraVersion, env);

    return res.finish(transactionResponseModel('transaction_list', transactions));
  } catch (err) {
    return res.error(err);
  }
};

module.exports = (arg1 = transactionRepository) => list(arg1);
