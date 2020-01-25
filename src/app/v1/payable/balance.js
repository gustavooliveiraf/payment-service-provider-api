const payableRepository = require('../../../infra/repositories/raw/payable/balance');
const balanceResponseModel = require('../../../domain/responseModels/payable/balance');

const balanceFunc = (repository) => async (req, res) => {
  try {
    const { infraVersion, env } = req;

    const userId = req.user.id;

    const { status } = req.payload;

    const { balance } = await repository.balance({ userId, status }, infraVersion, env);

    return res.finish(balanceResponseModel(balance));
  } catch (err) {
    return res.error(err);
  }
};

module.exports = (arg1 = payableRepository) => balanceFunc(arg1);
