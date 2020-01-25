const transactionResponseModel = require('./transaction');

const transactionModel = (transactions) => {
  const list = [];
  const { length } = transactions;

  for (let i = 0; i < length; i += 1) {
    list.push(transactionResponseModel(transactions[i].cards.dataValues,
      transactions[i].dataValues));
  }

  return {
    object: 'transaction_list',
    list,
  };
};

module.exports = transactionModel;
