module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'captureMethods', schema: 'transaction' }, [{
    name: 'magstripe',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'emv',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'ecommerce',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'captureMethods', schema: 'transaction' }, null, {}),
};
