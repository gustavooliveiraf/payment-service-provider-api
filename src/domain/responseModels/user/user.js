const schema = require('schm');
const {
  prefixAkTest, prefixAkProd, prefixEkTest, prefixEkProd,
} = require('../utils/constants');

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       active:
 *         type: boolean
 *       email:
 *         type: string
 *       testKeys:
 *         type: object
 *         properties:
 *           apiKey:
 *             type: string
 *           encryptionKey:
 *             type: string
 *       prodKeys:
 *         type: object
 *         properties:
 *           apiKey:
 *             type: string
 *           encryptionKey:
 *             type: string
 *       token:
 *         type: string
 *         description: to authenticate front end
 */

const userObject = schema({
  test: Object,
  prod: Object,
});

const userModel = (userTest, userProd, tokenTest, tokenProd) => {
  const test = {
    active: userTest.active,
    email: userTest.email,
    apiKey: `${prefixAkTest}${userTest.apiKey}`,
    encryptionKey: `${prefixEkTest}${userTest.encryptionKey}`,
    token: tokenTest,
  };
  const prod = {
    active: userProd.active,
    email: userProd.email,
    apiKey: `${prefixAkProd}${userProd.apiKey}`,
    encryptionKey: `${prefixEkProd}${userProd.encryptionKey}`,
    token: tokenProd,
  };

  return userObject.parse({
    test,
    prod,
  });
};

module.exports = userModel;
