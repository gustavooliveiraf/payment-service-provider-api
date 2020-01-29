const schema = require('schm');
const invert = require('../utils/invert');
const enums = require('../../../infra/database/enums/transaction');
const usedKeyEnum = require('../../../infra/database/enums/register/usedKey');

/**
 * @swagger
 * definitions:
 *   Transaction:
 *     type: object
 *     properties:
 *       object:
 *         type: string
 *         example: transaction
 *       id:
 *         type: string
 *       status:
 *         type: string
 *         example: authorized | refused
 *       refuseReason:
 *         type: string
 *       value:
 *         type: integer
 *       capture:
 *         type: boolean
 *       capturedValue:
 *         type: integer
 *       authorizedValue:
 *         type: integer
 *       paymentMethod:
 *         type: string
 *         example: debit_card | credit_card
 *       captureMethod:
 *         type: string
 *         example: ecommerce | magstripe | emv
 *       cardLastDigits:
 *         type: string
 *       cardHolderName:
 *         type: string
 *       cardBrand:
 *         type: string
 *       authorizationCode:
 *         type: string
 *       usedKey:
 *         type: string
 *         example: apiKey | encryptionKey
 *     required:
 *       - value
 *       - description
 *       - paymentMethod
 *       - captureMethod
 *       - cardNumber
 *       - cardHolderName
 *       - cardExpirationDate
 *       - cardCvv
 */

const captureMethod = invert(enums.captureMethod);
const paymentMethod = invert(enums.paymentMethod);
const status = invert(enums.status);
const usedKey = invert(usedKeyEnum);

const transactionObject = schema({
  object: String,
  id: String,
  status: String,
  refuseReason: String,
  value: Number,
  capture: Boolean,
  capturedValue: Number,
  authorizedValue: Number,
  paymentMethod: String,
  captureMethod: String,
  cardLastDigits: String,
  cardHolderName: String,
  cardBrand: String,
  description: String,
  authorizationCode: String,
  usedKey: String,
  payables: Array,
});

const transactionModel = (card, transaction) => {
  const transactionTemp = {
    id: transaction.id,
    value: transaction.value,
    capture: transaction.capture,
    capturedValue: transaction.capturedValue,
    authorizedValue: transaction.authorizedValue,
    captureMethod: captureMethod[transaction.captureMethodId],
    paymentMethod: paymentMethod[transaction.paymentMethodId],
    status: status[transaction.statusId],
    usedKey: usedKey[transaction.usedKeyId],
    refuseReason: transaction.refuseReason,
    authorizationCode: transaction.authorizationCode,
    description: transaction.description,
  };

  const cardTemp = {
    cardHolderName: card.holderName,
    cardLastDigits: card.lastDigits,
    cardBrand: card.brand,
  };

  return transactionObject.parse({
    object: 'transaction', ...cardTemp, ...transactionTemp, payables: transaction.payables,
  });
};

module.exports = transactionModel;
