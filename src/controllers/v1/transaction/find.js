const transactionRepository = require('../../../infra/repositories/orm/sequelize/transaction/findByPk');
const transactionResponseModel = require('../../../domain/responseModels/transaction/find');

const list = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env, transactionId } = req;

    const transaction = await repository.findByPk(transactionId, infraVersion, env);

    if (req.user.id !== transaction.users.id) throw new Error('unauthorized');

    return res.finish(transactionResponseModel(transaction.cards, transaction));
  } catch (err) {
    if (err.message === 'unauthorized') return res.unauthorized();

    return next(err);
  }
};

module.exports = (arg1 = transactionRepository) => list(arg1);
