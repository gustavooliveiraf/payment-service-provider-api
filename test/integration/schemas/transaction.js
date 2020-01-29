/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const { constant: { maxInteger, maxString } } = require('../../../src/web/validatorsAndParsers/schemas/utils');
const enums = require('../../../src/infra/database/enums/transaction');

const paymentMethodArray = Object.keys(enums.paymentMethod);
const captureMethodArray = Object.keys(enums.captureMethod);

const schemaSignUp = Joi.object().keys({
  object: Joi.string().max(maxString).required(),
  id: Joi.string().guid({ version: ['uuidv1'] }),
  status: Joi.string().max(maxString).required(),
  refuseReason: Joi.string().max(maxString).allow(null).required(),
  authorizedValue: Joi.number().integer().positive().max(maxInteger).required(),
  authorizationCode: Joi.string().max(maxString).required(),
  usedKey: Joi.string().max(maxString).required(),
  capture: Joi.boolean().required(),
  capturedValue: Joi.number().integer().positive().max(maxInteger).allow(null).required(),
  value: Joi.number().integer().positive().max(maxInteger).required(),
  description: Joi.string().max(maxString).required(),
  paymentMethod: Joi.any().valid(...paymentMethodArray).required(),
  captureMethod: Joi.any().valid(...captureMethodArray),
  cardLastDigits: Joi.string().max(maxString).required(), // 15 | 16
  cardHolderName: Joi.string().max(maxString).required(),
  cardBrand: Joi.string().max(maxString).required(),
});

module.exports = schemaSignUp;
