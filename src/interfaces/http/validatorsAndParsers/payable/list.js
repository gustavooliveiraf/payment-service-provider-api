const schema = require('../schemas/payable/list');

const list = async (req, res, next) => {
  try {
    req.payload = await schema.validateAsync(req.query, { stripUnknown: true });

    return next();
  } catch (err) {
    return res.badRequest(err.details);
  }
};

module.exports = list;
