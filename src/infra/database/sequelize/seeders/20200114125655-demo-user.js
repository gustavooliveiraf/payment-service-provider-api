const uuid = require('uuid/v1');

if (process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'production') {
  module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert({ tableName: 'users', schema: 'users' }, [{
      active: true,
      email: 'gof@cin.ufpe.com',
      password: '123456',
      apiKey: uuid(),
      encryptionKey: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'users', schema: 'users' }, null, {}),
  };
}
