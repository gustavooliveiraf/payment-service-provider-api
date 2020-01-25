const schema = require('schm');

/**
 * @swagger
 * definitions:
 *   Balance:
 *     type: object
 *     properties:
 *       object:
 *         type: string
 *         example: balance
 *       balance:
 *         type: integer
 */

const balanceObject = schema({
  object: String,
  balance: String,
});

const balanceModel = (balance) => balanceObject.parse({
  object: 'balance',
  balance,
});

module.exports = balanceModel;
