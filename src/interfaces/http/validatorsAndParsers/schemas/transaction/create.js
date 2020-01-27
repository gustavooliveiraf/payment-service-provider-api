/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const { constant: { maxInteger, maxString } } = require('../utils');
const enums = require('../../../../../infra/database/enums/transaction');

const paymentMethodArray = Object.keys(enums.paymentMethod);
const captureMethodArray = Object.keys(enums.captureMethod);

const schemaSignUp = Joi.object().keys({
  capture: Joi.boolean(),
  value: Joi.number().integer().positive().max(maxInteger).required(),
  description: Joi.string().max(maxString).required(),
  paymentMethod: Joi.any().valid(...paymentMethodArray).required(),
  captureMethod: Joi.any().valid(...captureMethodArray).required(),
  cardNumber: Joi.string().creditCard().required(), // 15 | 16
  cardHolderName: Joi.string().max(maxString).required(),
  cardExpirationDate: Joi.string().max(maxString).required(),
  cardCvv: Joi.string().max(maxString).required(), // 3 | 4
});

module.exports = schemaSignUp;
