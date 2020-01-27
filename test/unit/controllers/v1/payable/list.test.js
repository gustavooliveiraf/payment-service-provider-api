const payableController = require('../../../../../src/controllers/v1/payable/list');
const payableRepositoryMock = require('../../../../support/factories/payable');
const { UserModelRepositoryRandom } = require('../../../../support/models/user');
const PayableRepository = require('../../../../support/models/payable/payableRepository');
const { req, res, next } = require('../../../../support/expressMock');

describe('controllers/v1', () => {
  describe('payable', () => {
    describe('list', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          req.user = await UserModelRepositoryRandom({});
          req.payload = PayableRepository();

          const response = await payableController(
            payableRepositoryMock.success(PayableRepository()),
          )(req, res, next);

          expect(Array.isArray(response.response.list)).toBeTruthy();
          expect(Number.isInteger(response.response.list[0].value)).toBeTruthy();
        });
      });

      describe('error', () => {
        test('when there is an internal error', async () => {
          req.user = await UserModelRepositoryRandom({});
          req.payload = PayableRepository();

          const response = await payableController(
            payableRepositoryMock.internalError(PayableRepository()),
          )(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
