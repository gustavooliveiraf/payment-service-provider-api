const faker = require('faker');
const { status } = require('../../../../src/infra/database/enums/transaction');
const { card, transaction } = require('./request');

const statusArray = Object.keys(status);

const transactionModelRepository = () => ({
  id: faker.random.number(),
  status: statusArray[Math.floor(Math.random() * statusArray.length)],
  refuseReason: faker.lorem.slug(),
  ...card(),
  ...transaction(),
});

module.exports = transactionModelRepository;
