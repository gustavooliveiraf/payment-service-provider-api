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

const userModel = (userTest, userProd, jwtGenerator) => {
  const testKeys = {
    apiKey: `${prefixAkTest}${userTest.apiKey}`,
    encryptionKey: `${prefixEkTest}${userTest.encryptionKey}`,
  };
  const prodKeys = {
    apiKey: `${prefixAkProd}${userProd.apiKey}`,
    encryptionKey: `${prefixEkProd}${userProd.encryptionKey}`,
  };

  const { active, email } = { ...userTest };
  const token = jwtGenerator({ testKeys, prodKeys });

  return {
    active,
    email,
    testKeys,
    prodKeys,
    token,
  };
};

module.exports = userModel;
