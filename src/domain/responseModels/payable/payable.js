const schema = require('schm');
const invert = require('../utils/invert');
const statusEnum = require('../../../infra/database/enums/payable/status');
const formatDate = require('../utils/formatDate');

/**
 * @swagger
 * definitions:
 *   Payable:
 *     type: object
 *     properties:
 *       object:
 *         type: string
 *         example: transaction
 *       id:
 *         type: string
 *       value:
 *         type: integer
 *       status:
 *         type: string
 *         example: paid | waiting_funds
 *       fee:
 *         type: integer
 *       paymentDate:
 *         type: integer
 *       transactionId:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
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

const status = invert(statusEnum);

const payableObject = schema({
  object: String,
  id: String,
  value: Number,
  status: String,
  fee: Number,
  paymentDate: String,
  transactionId: String,
  createdAt: String,
  updatedAt: String,
});

const payableModel = (payable) => {
  const temp = {
    object: 'payable',
    id: payable.id,
    value: payable.value,
    status: status[payable.statusId],
    fee: payable.fee,
    paymentDate: formatDate(payable.paymentDate),
    transactionId: payable.transactionId,
    createdAt: formatDate(payable.createdAt),
    updatedAt: formatDate(payable.updatedAt),
  };

  return payableObject.parse(temp);
};

module.exports = payableModel;
