module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'captureMethods', schema: 'transaction' }, [{
    name: 'acquirer',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'antifraud',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'internal_error',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'no_acquirer',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'acquirer_timeout',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'captureMethods', schema: 'transaction' }, null, {}),
};
