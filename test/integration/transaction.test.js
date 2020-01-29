const request = require('../support/request');
const { truncate } = require('../support/truncate');
const { TransactionModelRequestRandom } = require('../support/models/transaction');
const { UserModelRequestRandom } = require('../support/models/user');
const schemaResponseTransaction = require('./schemas/transaction');
const genericFailure = require('./schemas/genericFailure');

afterAll(async () => {
  await Promise.all([truncate('Payable', 'test'), truncate('Payable', 'prod')]);
  await Promise.all([truncate('Transaction', 'test'), truncate('Transaction', 'prod')]);
  await Promise.all([truncate('Card', 'test'), truncate('Card', 'prod')]);
  await Promise.all([truncate('User', 'test'), truncate('User', 'prod')]);

  // const truncateWithPromiseAll = ['Transaction', 'Payable', 'Card', 'User'];
  // return Promise.all(truncateAll(truncateWithPromiseAll, 'test')
  // .concat(truncateAll(truncateWithPromiseAll, 'prod')));
});

describe('integration', () => {
  describe('transaction', () => {
    describe('create', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          const transactionRandom = TransactionModelRequestRandom.full();
          const userRandom = UserModelRequestRandom();

          const user = await request.post('/jest/user/sign-up')
            .send(userRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const response = await request.post(`/jest/transactions?api_key=${user.body.test.apiKey}`)
            .send(transactionRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const value = await schemaResponseTransaction.validateAsync(response.body);

          expect(value.value).toBe(transactionRandom.value);
          expect(value.paymentMethod).toBe(transactionRandom.paymentMethod);
          expect(value.cardHolderName).toBe(transactionRandom.cardHolderName);
        });
      });

      describe('error', () => {
        test('when transaction is invalid', async () => {
          const userRandom = UserModelRequestRandom();
          const transactionRandom = TransactionModelRequestRandom.full();
          transactionRandom.value = 'some invalid_parameter';

          const user = await request.post('/jest/user/sign-up')
            .send(userRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const response = await request.post(`/jest/transactions?api_key=${user.body.test.apiKey}`)
            .send(transactionRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(400);

          const value = await genericFailure.validateAsync(response.body);

          expect(value.error.context.key).toBe('value');
          expect(value.error.type).toBe('invalid_parameter');
        });
      });
    });
  });
});
