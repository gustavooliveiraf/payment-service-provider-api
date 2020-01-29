/* eslint-disable max-len */
const faker = require('faker');
const { paymentMethod } = require('../../../../src/infra/database/enums/transaction');

const paymentMethodArray = Object.keys(paymentMethod);
const sampleCreditCard = ['4111111111111111', '5500000000000004']; // ,'340000000000009']; // [visa, masterCard, american express]
const sampleDescription = ['Smartband XYZ 2.0', 'Smartband XYZ 3.0', 'Smartband XYZ 4.0'];

const transaction = (paymentMethodArg, capture) => ({
  capture: capture || faker.random.boolean(),
  value: faker.random.number(),
  description: sampleDescription[Math.floor(Math.random() * sampleDescription.length)],
  paymentMethod: paymentMethodArg || paymentMethodArray[Math.floor(Math.random() * paymentMethodArray.length)],
  usedKey: faker.random.uuid(),
  userId: faker.random.number(),
});

const card = () => ({
  number: sampleCreditCard[Math.floor(Math.random() * sampleCreditCard.length)],
  holderName: faker.name.findName(),
  expirationDate: faker.date.future(),
  cvv: `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
});

const cardCard = () => ({
  cardNumber: sampleCreditCard[Math.floor(Math.random() * sampleCreditCard.length)],
  cardHolderName: faker.name.findName(),
  cardExpirationDate: faker.date.future(),
  cardCvv: `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
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
