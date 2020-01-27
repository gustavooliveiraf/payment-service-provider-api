const schema = require('../schemas/transaction/list');

const create = async (req, res, next) => {
  try {
    req.payload = await schema.validateAsync(req.query, { stripUnknown: true });

    return next();
  } catch (err) {
    return res.badRequest(err.details[0]);
  }
};

module.exports = create;
