/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const { constant: { maxInteger, maxString } } = require('../../../../../app/utils');
const paymentMethod = require('../../../../../infra/database/enums/transaction/paymentMethod');

const paymentMethodArray = Object.keys(paymentMethod);

const schemaSignUp = Joi.object().keys({
  value: Joi.number().integer().positive().max(maxInteger).required(),
  description: Joi.string().max(maxString).required(),
  paymentMethod: Joi.any().valid(...paymentMethodArray),
  cardNumber: Joi.string().creditCard().required(),
  name: Joi.string().max(maxString).required(),
  expirationDate: Joi.string().max(maxString).required(),
  verificationCode: Joi.string().max(maxString).required(),
});

module.exports = schemaSignUp;
