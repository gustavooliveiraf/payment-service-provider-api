/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const statusEnum = require('../../../../infra/database/enums/payable/status');

const statusArray = Object.keys(statusEnum);

const schemaSignUp = Joi.object().keys({
  status: Joi.any().valid(...statusArray).required(),
});

module.exports = schemaSignUp;
