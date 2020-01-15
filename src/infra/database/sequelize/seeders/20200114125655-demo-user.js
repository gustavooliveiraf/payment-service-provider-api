const uuid = require('uuid/v1');

if (process.env.NODE_ENV === 'development') {
  module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'users', schema: 'users' }, [{
      active: true,
      email: 'gof@cin.ufpe.com',
      password: '123456',
      apiKeyTest: uuid(),
      encryptionKeyTest: uuid(),
      apiKeyProd: uuid(),
      encryptionKeyProd: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'gof2@cin.ufpe.com',
      password: '123456',
      apiKeyTest: uuid(),
      encryptionKeyTest: uuid(),
      apiKeyProd: uuid(),
      encryptionKeyProd: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'users', schema: 'users' }, null, {}),
  };
}
