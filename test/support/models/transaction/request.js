const faker = require('faker');
const { paymentMethod, captureMethod } = require('../../../../src/infra/database/enums/transaction');

const paymentMethodArray = Object.keys(paymentMethod);
const captureMethodArray = Object.keys(captureMethod);
const sampleCreditCard = ['4111111111111111', '5500000000000004']; // ,'340000000000009']; // [visa, masterCard, american express]
const sampleDescription = ['Smartband XYZ 2.0', 'Smartband XYZ 3.0', 'Smartband XYZ 4.0'];

const transaction = () => ({
  capture: faker.random.boolean(),
  value: faker.random.number(),
  description: sampleDescription[Math.floor(Math.random() * sampleDescription.length)],
  paymentMethod: paymentMethodArray[Math.floor(Math.random() * paymentMethodArray.length)],
  captureMethod: captureMethodArray[Math.floor(Math.random() * captureMethodArray.length)],
  usedKey: faker.random.uuid(),
  userId: faker.random.number(),
});

const card = () => ({
  number: sampleCreditCard[Math.floor(Math.random() * sampleCreditCard.length)],
  holderName: faker.name.findName(),
  expirationDate: faker.date.future(),
  cvv: `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
});

module.exports = {
  transaction,
  card,
};
