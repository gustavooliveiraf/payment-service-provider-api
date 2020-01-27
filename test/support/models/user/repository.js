const faker = require('faker');
const { hashFuncs: { hash } } = require('../../../../src/controllers/v1/user/utils');

const user = async ({ email, password }) => ({
  id: faker.random.number(),
  active: faker.random.boolean(),
  email: email || faker.internet.email(),
  apiKey: faker.random.uuid(),
  encryptionKey: faker.random.uuid(),
  password: password ? (await hash(password)) : faker.internet.password(),
});

module.exports = user;
