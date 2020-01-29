const schema = require('../schemas/transaction/find');

const create = async (req, res, next) => {
  try {
    req.transactionId = (await schema.validateAsync(req.params, { stripUnknown: true })).id;

    return next();
  } catch (err) {
    return res.badRequest(err.details[0]);
  }
};

module.exports = create;
