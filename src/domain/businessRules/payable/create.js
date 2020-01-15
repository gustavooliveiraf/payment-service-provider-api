const { feeDebitCard, feeCreditCard } = require('../../../../config');

const feeDebit = parseFloat(feeDebitCard);
const feeCredit = parseFloat(feeCreditCard);

const feeDebitCalc = 1 - (feeDebit / 100);
const feeCreditCalc = 1 - (feeCredit / 100);

const msIn30days = 30 * 24 * 60 * 60 * 1000;

function round(value) {
  // eslint-disable-next-line prefer-template
  return Math.round(Math.round(value + 'e2') + 'e-2');
}

const create = (transaction) => {
  const now = new Date();

  if (transaction.paymentMethod === 'debit_card') {
    return {
      status: 'paid',
      paymentDate: now,
      fee: feeDebit,
      value: round(transaction.value * feeDebitCalc),
    };
  }
  // transaction.paymentMethod === 'credit_card'
  return {
    status: 'waiting_funds',
    paymentDate: new Date(now.getTime() + msIn30days),
    fee: feeCredit,
    value: round(transaction.value * feeCreditCalc),
  };
};

module.exports = create;
