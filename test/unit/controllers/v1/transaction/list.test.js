const transactionController = require('../../../../../src/controllers/v1/transaction/list');
const transactionRepositoryMock = require('../../../../support/factories/transaction');
const { TransactionModelRequestRandom } = require('../../../../support/models/transaction');
const { req, res, next } = require('../../../../support/expressMock');

describe('controllers/v1', () => {
  describe('transaction', () => {
    describe('list', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          req.payload = TransactionModelRequestRandom.transaction();
          req.payload.cards = TransactionModelRequestRandom.card();

          const response = await transactionController(
            transactionRepositoryMock.success(req.payload),
          )(req, res, next);

          expect(Array.isArray(response.response.list)).toBeTruthy();
          expect(response.response.list[0].value).toBe(req.payload.value);
          expect(response.response.list[0].description).toBe(req.payload.description);
        });
      });

      describe('error', () => {
        test('when there is an internal error', async () => {
          req.payload = TransactionModelRequestRandom.transaction();
          req.payload.cards = TransactionModelRequestRandom.card();

          const response = await transactionController(
            transactionRepositoryMock.internalError(req.payload),
          )(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
