const request = require('../support/request');
const { truncate } = require('../support/truncate');
const { TransactionModelRequestRandom } = require('../support/models/transaction');
const { UserModelRequestRandom } = require('../support/models/user');
const schemaResponsePayable = require('./schemas/payable');
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
  describe('payable', () => {
    describe('balance', () => {
      describe('sucess', () => {
        test('get balance paymentMethod = debit_card', async () => {
          const capture = true;
          const transactionRandom = TransactionModelRequestRandom.full('debit_card', capture);
          const userRandom = UserModelRequestRandom();

          const user = await request.post('/jest/user/sign-up')
            .send(userRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          await request.post(`/jest/transactions?api_key=${user.body.test.apiKey}`)
            .send(transactionRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const response = await request.get(`/jest/payables/balance?api_key=${user.body.test.apiKey}&status=paid`)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const value = await schemaResponsePayable.validateAsync(response.body);

          expect(value.object).toBe('balance');
        });

        test('get balance paymentMethod = credit_card', async () => {
          const transactionRandom = TransactionModelRequestRandom.full('credit_card');
          const userRandom = UserModelRequestRandom();

          const user = await request.post('/jest/user/sign-up')
            .send(userRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          await request.post(`/jest/transactions?api_key=${user.body.test.apiKey}`)
            .send(transactionRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const response = await request.get(`/jest/payables/balance?api_key=${user.body.test.apiKey}&status=paid`)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const value = await schemaResponsePayable.validateAsync(response.body);

          expect(value.object).toBe('balance');
        });
      });

      describe('error', () => {
        test('when transaction is invalid', async () => {
          const transactionRandom = TransactionModelRequestRandom.full('credit_card');
          const userRandom = UserModelRequestRandom();

          const user = await request.post('/jest/user/sign-up')
            .send(userRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          await request.post(`/jest/transactions?api_key=${user.body.test.apiKey}`)
            .send(transactionRandom)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const response = await request.get(`/jest/payables/balance?api_key=${user.body.test.apiKey}`)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(400);

          const value = await genericFailure.validateAsync(response.body);

          expect(value.error.context.key).toBe('status');
          expect(value.error.type).toBe('invalid_parameter');
        });
      });
    });
  });
});
