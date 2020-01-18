const schema = require('schm');
const invert = require('../utils/invert');
const enums = require('../../../infra/database/enums/transaction');
const usedKeyEnum = require('../../../infra/database/enums/register/usedKey');

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
  authorizationCode: String,
  usedKey: String,
});

const transactionModel = (objectName, card, transaction) => {
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
  };

  const cardTemp = {
    cardHolderName: card.holderName,
    cardLastDigits: card.lastDigits,
    cardBrand: card.brand,
  };

  return transactionObject.parse({
    object: objectName, ...cardTemp, ...transactionTemp,
  });
};

module.exports = transactionModel;
