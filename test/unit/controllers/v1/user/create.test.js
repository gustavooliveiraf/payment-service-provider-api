const userController = require('../../../../../src/controllers/v1/user/create');
const UserRepositoryMock = require('../../../../support/factories/user');
const { UserModelRequestRandom, UserModelRepositoryRandom } = require('../../../../support/models/user');
const { req, res, next } = require('../../../../support/expressMock');

describe('controllers/v1', () => {
  describe('user', () => {
    describe('create', () => {
      describe('sucess', () => {
        test('when user is valid and does not exist', async () => {
          const UserModelRequest = UserModelRequestRandom();
          const UserModelRepository = await UserModelRepositoryRandom(UserModelRequest);

          req.user = UserModelRequest;
          const response = await userController(
            UserRepositoryMock.findOrCreate.userNotExists(UserModelRepository),
          )(req, res, next);

          expect(UserModelRequest.email).toBe(response.response.test.email);
          expect(typeof response.response.test === 'object').toBeTruthy();
          expect(typeof response.response.prod === 'object').toBeTruthy();
        });
      });

      describe('error', () => {
        test('when user is valid and exists', async () => {
          req.user = await UserModelRequestRandom();

          const response = await
          userController(UserRepositoryMock.findOrCreate.userExists)(req, res, next);

          expect(response.badRequestResponse.message).toBe('E-mail já existente');
        });

        test('when there is an internal error', async () => {
          const response = await
          userController(UserRepositoryMock.findOrCreate.internalError)(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
