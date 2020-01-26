const faker = require('faker');

const user = () => ({
  active: faker.random.boolean(),
  email: faker.internet.email(),
  apiKey: faker.random.uuid(),
  encryptionKey: faker.random.uuid(),
});

module.exports = user;
