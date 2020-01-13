const schema = require('../schemas/transaction/create');

const create = async (req, res, next) => {
  try {
    req.payload = await schema.validateAsync(req.body);
    req.payload.userId = 1;

    return next();
  } catch (err) {
    return res.badRequest(err.details);
  }
};

module.exports = create;
