module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'payableStatuses', schema: 'payable' }, [{
    name: 'paid',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'waiting_funds',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'payableStatuses', schema: 'payable' }, null, {}),
};
