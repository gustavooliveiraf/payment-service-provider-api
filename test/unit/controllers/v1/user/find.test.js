const userController = require('../../../../../src/controllers/v1/user/find');
const UserRepositoryMock = require('../../../../support/factories/user');
const { UserModelRequestRandom, UserModelRepositoryRandom } = require('../../../../support/models/user');
const { req, res, next } = require('../../../../support/expressMock');

describe('controllers/v1', () => {
  describe('user', () => {
    describe('find', () => {
      describe('sucess', () => {
        test('when the user is valid, he exists and has a correct password', async () => {
          const UserModelRequest = UserModelRequestRandom();
          const UserModelRepository = await UserModelRepositoryRandom(UserModelRequest);

          req.user = UserModelRequest;
          const response = await
          userController(UserRepositoryMock.find.userExists(UserModelRepository))(req, res, next);

          expect(UserModelRepository.email).toBe(response.response.test.email);
          expect(typeof response.response.test === 'object').toBeTruthy();
          expect(typeof response.response.prod === 'object').toBeTruthy();
        });
      });

      describe('error', () => {
        test('when the user is valid, he exists and has an incorrect password', async () => {
          const UserModelRequest = await UserModelRepositoryRandom({});
          const UserModelRepository = await UserModelRepositoryRandom({});

          req.user = UserModelRequest;
          const response = await
          userController(UserRepositoryMock.find.userExists(UserModelRepository))(req, res, next);

          expect(response.badRequestResponse.message).toBe('Usuário e/ou senha inválidos');
        });

        test('when user is valid and does not exist', async () => {
          req.user = UserModelRequestRandom({});

          const response = await
          userController(UserRepositoryMock.find.userNotExists)(req, res, next);

          expect(response.badRequestResponse.message).toBe('Usuário e/ou senha inválidos');
        });

        test('when there is an internal error', async () => {
          const response = await
          userController(UserRepositoryMock.find.internalError)(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
