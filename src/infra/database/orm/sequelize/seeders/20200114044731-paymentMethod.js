module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'paymentMethods', schema: 'transaction' }, [{
    name: 'debitCard',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'creditCard',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'paymentMethods', schema: 'transaction' }, null, {}),
};
