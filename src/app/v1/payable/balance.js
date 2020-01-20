const payableRepository = require('../../../infra/repositories/raw/payable/balance');

const balance = (repository) => async (req, res) => {
  try {
    const { infraVersion, env } = req;

    const userId = req.user.id;

    const { status } = req.payload;

    const payables = await repository.balance({ userId, status }, infraVersion, env);

    return res.finish(payables);
  } catch (err) {
    return res.error(err);
  }
};

module.exports = (arg1 = payableRepository) => balance(arg1);
