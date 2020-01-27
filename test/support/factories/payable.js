const faker = require('faker');

const payableRepositoryMock = {
  success: (payload) => ({
    balance: () => faker.random.number(),
    findAll: () => [payload],
  }),
  internalError: () => ({
    balance: () => { throw new Error('Some Error'); },
    findAll: () => { throw new Error('Some Error'); },
  }),
};

module.exports = payableRepositoryMock;
