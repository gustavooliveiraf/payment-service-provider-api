/* eslint-disable import/no-extraneous-dependencies */
const { production } = require('../../../config');

// const logStash = (req, res, next) => {
//   logStash(uuid(), ...);
// };

module.exports = !production
  ? require('morgan')('dev')
  : (req, res, next) => next();
