/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const { constant: { maxInteger, maxString } } = require('../utils');

const schema = Joi.object().keys({
  status: Joi.string().max(maxString).required(),
  refuseReason: Joi.string().max(maxString).allow(null),
  authorizedValue: Joi.number().integer().positive().max(maxInteger).allow(null),
  capturedValue: Joi.number().integer().positive().max(maxInteger).allow(null),
  authorizationCode: Joi.string().max(maxString).allow(null),
  brandType: Joi.string().max(maxString).required(),
  captureMethod: Joi.string().max(maxString).required(),
}).unknown(true);

module.exports = schema;
