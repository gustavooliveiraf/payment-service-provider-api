const faker = require('faker');

const user = () => ({
  id: faker.random.number(),
  active: faker.random.boolean(),
  email: faker.internet.email(),
  apiKey: faker.random.uuid(),
  encryptionKey: faker.random.uuid(),
});

const UserModelMock = {
  userExists: {
    find: () => user(),
  },
  userNotExists: {
    find: () => { throw new Error('ValidationError'); },
  },
  internalError: {
    find: () => { throw new Error('Some Error'); },
  },
};

module.exports = UserModelMock;
