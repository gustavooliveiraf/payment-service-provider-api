const transactionResponseModel = require('./create');

const transactionModel = (objectName, transactions) => {
  const transactionsArray = [];
  const { length } = transactions;

  for (let i = 0; i < length; i += 1) {
    transactionsArray.push(transactionResponseModel(objectName,
      transactions[i].cards.dataValues, transactions[i].dataValues));
  }

  return transactionsArray;
};

module.exports = transactionModel;
