/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi');

const schemaSignUp = Joi.object().keys({
  id: Joi.string().guid({
    version: ['uuidv1'],
  }),
});

module.exports = schemaSignUp;
