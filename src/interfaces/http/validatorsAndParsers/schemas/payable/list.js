/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const {
  constant: {
    maxInteger, maxCount, defaultCount, defaultPage,
  },
} = require('../utils');

const schemaSignUp = Joi.object().keys({
  count: Joi.number().integer().positive().max(maxCount).default(defaultCount),
  page: Joi.number().integer().positive().max(maxInteger).default(defaultPage),
});

module.exports = schemaSignUp;
