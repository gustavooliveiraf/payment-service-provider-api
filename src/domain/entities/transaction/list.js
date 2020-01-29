const transactionResponseModel = require('./transaction');

const transactionModel = (transactions) => {
  const list = [];
  const { length } = transactions;

  for (let i = 0; i < length; i += 1) {
    const card = transactions[i].cards.dataValues || transactions[i].cards;
    const transaction = transactions[i].dataValues || transactions[i];

    list.push(transactionResponseModel(card, transaction));
  }

  return {
    object: 'transaction_list',
    list,
  };
};

module.exports = transactionModel;
