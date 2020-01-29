const uuid = require('uuid/v1');
const { hashFuncs: { hash } } = require('../../../../../controllers/v1/user/utils');

if (process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'production') {
  module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert({ tableName: 'users', schema: 'users' }, [{
      active: true,
      email: 'test@gmail.com',
      password: await hash('test'),
      apiKey: uuid(),
      encryptionKey: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'users', schema: 'users' }, null, {}),
  };
} else {
  // to test
  // to test
  module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert({ tableName: 'users', schema: 'users' }, [{
      active: true,
      email: 'test@gmail.com',
      password: await hash('test'),
      apiKey: uuid(),
      encryptionKey: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete({ tableName: 'users', schema: 'users' }, null, {}),
  };
}
