const payableRepository = require('../../../infra/repositories/orm/sequelize/payable/findAll');
const payableResponseModel = require('../../../domain/responseModels/payable/list');

const findAll = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env } = req;

    const userId = req.user.id;

    const { count, page, status } = req.payload;

    const payables = await repository.findAll({
      userId, count, page, status,
    }, infraVersion, env);

    return res.finish(payableResponseModel(payables));
  } catch (err) {
    return next(err);
  }
};

module.exports = (arg1 = payableRepository) => findAll(arg1);
