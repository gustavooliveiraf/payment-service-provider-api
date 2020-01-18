/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const { constant: { maxInteger } } = require('../utils');

const count = {
  maxCount: 1000,
  default: 10,
};

const page = {
  default: 1,
};

const schemaSignUp = Joi.object().keys({
  count: Joi.number().integer().positive().max(count.maxCount).default(count.default),
  page: Joi.number().integer().positive().max(maxInteger).default(page.default),
});

module.exports = schemaSignUp;
