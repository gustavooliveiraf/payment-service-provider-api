const transactionRepository = require('../../../infra/repositories/orm/sequelize/transaction/findByPk');
const transactionFullResponseModel = require('../../../domain/entities/transaction/full');

const list = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env, transactionId } = req;

    const transaction = await repository.findByPk(transactionId, infraVersion, env);

    if (req.user.id !== transaction.users.id) throw new Error('unauthorized');

    return res.finish(transactionFullResponseModel(transaction.cards, transaction));
  } catch (err) {
    if (err.message === 'ValidationError') return res.badRequest({ message: 'TransactionId inexistente', invalide_parameter: 'transactionId' });

    return next(err);
  }
};

module.exports = (arg1 = transactionRepository) => list(arg1);
