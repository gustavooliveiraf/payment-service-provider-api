const Joi = require('@hapi/joi');
const { constant: { maxString, minDomainSegments } } = require('../utils');

const schemaSignIn = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().max(maxString).required(),
});

module.exports = schemaSignIn;
