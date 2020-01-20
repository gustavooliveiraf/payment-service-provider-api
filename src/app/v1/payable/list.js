const payableRepository = require('../../../infra/repositories/orm/sequelize/payable/findAll');
// const payableResponseModel = require('../../../domain/responseModels/transaction/list');

const findAll = (repository) => async (req, res) => {
  try {
    const { infraVersion, env } = req;

    const userId = req.user.id;

    const { count, page } = req.payload;

    const payables = await repository.findAll({ userId, count, page }, infraVersion, env);

    return res.finish(payables);
  } catch (err) {
    return res.error(err);
  }
};

module.exports = (arg1 = payableRepository) => findAll(arg1);
