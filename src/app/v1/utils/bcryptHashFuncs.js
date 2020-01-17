const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash = async (password) => bcrypt.hash(password, saltRounds);

const compare = async (password, hashPassword) => bcrypt.compare(password, hashPassword);

module.exports = {
  hash,
  compare,
};
