module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'usedKeys', schema: 'register' }, [{
    name: 'apiKey',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'encryptionKey',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'usedKeys', schema: 'register' }, null, {}),
};
