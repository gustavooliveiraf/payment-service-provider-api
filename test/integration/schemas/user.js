const Joi = require('@hapi/joi');
const { maxString } = require('../../../src/interfaces/http/validatorsAndParsers/schemas/utils/constants');

const userObject = Joi.object().keys({
  active: Joi.boolean().required(),
  email: Joi.string().email().required(),
  apiKey: Joi.string().max(maxString).required(),
  encryptionKey: Joi.string().max(maxString).required(),
  token: Joi.string().max(2 * maxString).required(),
});

const schemaResponseUser = Joi.object().keys({
  test: userObject,
  prod: userObject,
});

module.exports = schemaResponseUser;
