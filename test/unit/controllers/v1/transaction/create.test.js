const transactionController = require('../../../../../src/controllers/v1/transaction/create');
const transactionRepositoryMock = require('../../../../support/factories/transaction');
const { TransactionModelRequestRandom } = require('../../../../support/models/transaction');
const { req, res, next } = require('../../../../support/expressMock');

describe('controllers/v1', () => {
  describe('transaction', () => {
    describe('create', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          req.payload = {
            transaction: TransactionModelRequestRandom.transaction(),
            card: TransactionModelRequestRandom.card(),
          };

          const response = await transactionController(
            transactionRepositoryMock.success(req.payload),
          )(req, res, next);

          expect(response.response.value).toBe(req.payload.transaction.value);
          expect(response.response.description).toBe(req.payload.transaction.description);
          expect(typeof response.response === 'object').toBeTruthy();
        });
      });

      describe('error', () => {
        test('when there is an internal error', async () => {
          req.payload = {
            transaction: TransactionModelRequestRandom.transaction(),
            card: TransactionModelRequestRandom.card(),
          };

          const response = await transactionController(
            transactionRepositoryMock.internalError(req.payload),
          )(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
