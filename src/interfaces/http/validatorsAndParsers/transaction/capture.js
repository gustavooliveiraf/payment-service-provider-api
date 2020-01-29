const schema = require('../schemas/transaction/capture');

const create = async (req, res, next) => {
  try {
    req.transaction = await schema.validateAsync({ ...req.params, ...req.query },
      { stripUnknown: true });

    return next();
  } catch (err) {
    return res.badRequest(err.details[0]);
  }
};

module.exports = create;
