/* eslint-disable import/no-extraneous-dependencies */
const { envDevelopment } = require('../../../../config');

module.exports = envDevelopment
  ? require('morgan')('dev')
  : (req, res, next) => next();
