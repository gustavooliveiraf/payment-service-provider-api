const payableController = require('../../../../../src/controllers/v1/payable/balance');
const payableRepositoryMock = require('../../../../support/factories/payable');
const { UserModelRepositoryRandom } = require('../../../../support/models/user');
const { req, res, next } = require('../../../../support/expressMock');

describe('controllers/v1', () => {
  describe('payable', () => {
    describe('balance', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          req.user = await UserModelRepositoryRandom({});
          req.payload = { status: 'status' };

          const response = await payableController(
            payableRepositoryMock.success(req.payload),
          )(req, res, next);

          expect(Number.isInteger(parseInt(response.response.balance, 10))).toBeTruthy();
        });
      });

      describe('error', () => {
        test('when there is an internal error', async () => {
          req.user = await UserModelRepositoryRandom({});
          req.payload = { status: 'status' };

          const response = await payableController(
            payableRepositoryMock.internalError(req.payload),
          )(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
