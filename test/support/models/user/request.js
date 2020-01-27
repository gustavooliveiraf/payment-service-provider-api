const faker = require('faker');

const user = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

module.exports = user;
