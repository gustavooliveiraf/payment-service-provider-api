const authController = require('../../../../src/controllers/auth/auth');
const UserModelMock = require('../../../support/factories/user');
const { UserModelRequestRandom, UserModelRepositoryRandom } = require('../../../support/models/user');
const { req, res, next } = require('../../../support/expressMock');

describe('controllers/v1', () => {
  describe('auth', () => {
    describe('findUser', () => {
      describe('success', () => {
        test('when user is valid', async () => {
          const UserModelRequest = UserModelRequestRandom();
          const UserModelRepository = await UserModelRepositoryRandom(UserModelRequest);

          req.user = UserModelRequest;
          const response = await
          authController(UserModelMock.find.userExists(UserModelRepository))({});

          expect(Number.isInteger(response.id)).toBeTruthy();
          expect((typeof response.active) === 'boolean').toBeTruthy();
          expect((typeof response.email) === 'string').toBeTruthy();
          expect((typeof response.apiKey) === 'string').toBeTruthy();
          expect((typeof response.encryptionKey) === 'string').toBeTruthy();
        });
      });

      describe('error', () => {
        test('when user is invalid', async () => {
          const response = await authController(UserModelMock.find.userNotExists)(req, res, next);

          expect(response.badRequestResponse.message).toBe('key inválida');
        });

        test('when there is an internal error', async () => {
          const response = await authController(UserModelMock.find.internalError)(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
