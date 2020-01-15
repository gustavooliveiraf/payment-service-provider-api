module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'transactionStatuses', schema: 'transaction' }, [{
    name: 'authorized',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'refused',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'transactionStatuses', schema: 'transaction' }, null, {}),
};
