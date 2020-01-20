const schema = require('../schemas/payable/balance');

const balance = async (req, res, next) => {
  try {
    req.payload = await schema.validateAsync(req.query, { stripUnknown: true });

    return next();
  } catch (err) {
    return res.badRequest(err.details);
  }
};

module.exports = balance;
