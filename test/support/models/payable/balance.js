const faker = require('faker');

const balanceRepository = () => ({
  balance: faker.random.number(),
});

module.exports = balanceRepository;
