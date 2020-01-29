/* eslint-disable import/no-extraneous-dependencies */
const { production } = require('../../../config');

module.exports = !production
  ? require('morgan')('dev')
  : (req, res, next) => next();
