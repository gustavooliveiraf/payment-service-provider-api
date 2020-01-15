const schema = require('../schemas/user/signUp');

const create = async (req, res, next) => {
  try {
    req.user = await schema.validateAsync(req.body);

    return next();
  } catch (err) {
    return res.badRequest(err.details);
  }
};

module.exports = create;
