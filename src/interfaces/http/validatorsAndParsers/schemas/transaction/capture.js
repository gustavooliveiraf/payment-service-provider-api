/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');
const { constant: { maxInteger } } = require('../utils');

const schemaSignUp = Joi.object().keys({
  id: Joi.string().guid({ version: ['uuidv1'] }),
  value: Joi.number().integer().positive().max(maxInteger).required(),
});

module.exports = schemaSignUp;
