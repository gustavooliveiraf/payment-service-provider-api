const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../../../../config');

const jwtGenerator = (payload) => jwt.sign(
  payload,
  jwtPrivateKey,
  // { expiresIn: constant.msInMinute * constant.limLastLogin }
);

module.exports = jwtGenerator;
