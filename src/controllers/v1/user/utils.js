const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../../../../config');

const saltRounds = 10;

const hash = async (password) => bcrypt.hash(password, saltRounds);

const compare = async (password, hashPassword) => {
  if (await bcrypt.compare(password, hashPassword)) return true;
  throw new Error('ValidationError');
};

const generateToken = (userTest, userProd) => {
  const tokenTest = jwt.sign({
    apiKey: userTest.apiKey, encryptionKey: userTest.encryptionKey,
  }, jwtPrivateKey);
  const tokenProd = jwt.sign({
    apiKey: userProd.apiKey, encryptionKey: userProd.encryptionKey,
  }, jwtPrivateKey);

  return {
    tokenTest,
    tokenProd,
  };
};

module.exports = {
  generateToken,
  hashFuncs: { hash, compare },
};
