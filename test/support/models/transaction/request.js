/* eslint-disable max-len */
const faker = require('faker');
const { paymentMethod } = require('../../../../src/infra/database/enums/transaction');

const paymentMethodArray = Object.keys(paymentMethod);
const sampleCreditCard = ['4111111111111111', '5500000000000004']; // ,'340000000000009']; // [visa, masterCard, american express]
const sampleDescription = ['Smartband XYZ 2.0', 'Smartband XYZ 3.0', 'Smartband XYZ 4.0'];

const transaction = (paymentMethodArg, capture) => ({
  capture: capture || faker.random.boolean(),
  value: faker.random.number(40000),
  description: sampleDescription[faker.random.number(sampleDescription.length - 1)],
  paymentMethod: paymentMethodArg || paymentMethodArray[faker.random.number(paymentMethodArray.length - 1)],
  usedKey: faker.random.uuid(),
  userId: faker.random.number(),
});

const card = () => ({
  number: sampleCreditCard[faker.random.number(0)],
  holderName: faker.name.findName(),
  expirationDate: faker.date.future(),
  cvv: faker.random.number({ min: 100, max: 999 }).toString(),
});

const cardCard = () => ({
  cardNumber: sampleCreditCard[faker.random.number(0)],
  cardHolderName: faker.name.findName(),
  cardExpirationDate: faker.date.future(),
  cardCvv: faker.random.number({ min: 100, max: 999 }).toString(),
});

const full = (paymentMethodArg, capture) => ({
  ...transaction(paymentMethodArg, capture),
  ...cardCard(),
});

module.exports = {
  transaction,
  card,
  full,
};
