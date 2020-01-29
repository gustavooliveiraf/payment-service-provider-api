const Joi = require('@hapi/joi');
const { maxString } = require('../../../src/interfaces/http/validatorsAndParsers/schemas/utils/constants');

const schema = Joi.object().keys({
  object: Joi.string().max(maxString).required(),
  balance: Joi.string().max(maxString).allow(null).required(),
});

module.exports = schema;
