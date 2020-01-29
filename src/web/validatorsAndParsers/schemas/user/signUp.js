const Joi = require('@hapi/joi');
const {
  constant: { maxString, minDomainSegments, minPassword },
} = require('../utils');

const schemaSignUp = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments }).lowercase().required(),
  password: Joi.string().min(minPassword).max(maxString).required(),
});

module.exports = schemaSignUp;
