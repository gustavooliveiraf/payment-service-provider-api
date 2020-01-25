/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const statusEnum = require('../../../../../infra/database/enums/payable/status');
const {
  constant: {
    maxInteger, maxCount, defaultCount, defaultPage,
  },
} = require('../utils');

const statusArray = Object.keys(statusEnum);

const schemaSignUp = Joi.object().keys({
  status: Joi.any().valid(...statusArray),
  count: Joi.number().integer().positive().max(maxCount).default(defaultCount),
  page: Joi.number().integer().positive().max(maxInteger).default(defaultPage),
});

module.exports = schemaSignUp;
