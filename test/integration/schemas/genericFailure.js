const Joi = require('@hapi/joi');
const { maxString } = require('../../../src/web/validatorsAndParsers/schemas/utils/constants');

const genericFailure = Joi.object().keys({
  error: Joi.object().required(),
  method: Joi.string().max(10).required(),
  url: Joi.string().max(maxString).required(),
});

module.exports = genericFailure;
