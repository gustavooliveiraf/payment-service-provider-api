const payableRepository = require('../../../infra/repositories/raw/pg/payable/balance');
const balanceResponseModel = require('../../../domain/responseModels/payable/balance');

const balanceFunc = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env } = req;

    const userId = req.user.id;

    const { status } = req.payload;

    const { balance } = await repository.balance({ userId, status }, infraVersion, env);

    return res.finish(balanceResponseModel(balance));
  } catch (err) {
    return next(err);
  }
};

module.exports = (arg1 = payableRepository) => balanceFunc(arg1);
