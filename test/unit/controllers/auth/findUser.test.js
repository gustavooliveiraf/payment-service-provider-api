const auth = require('../../../../src/controllers/auth/auth');
const UserModelMock = require('../../../support/factories/user');
const { req, res, next } = require('../../../support/expressMock');

describe('controllers', () => {
  describe('auth', () => {
    describe('findUser', () => {
      describe('SUCCESS', () => {
        test('when user is valid', async () => {
          const response = await auth(UserModelMock.userExists)({});

          expect(Number.isInteger(response.id)).toBeTruthy();
          expect((typeof response.active) === 'boolean').toBeTruthy();
          expect((typeof response.email) === 'string').toBeTruthy();
          expect((typeof response.apiKey) === 'string').toBeTruthy();
          expect((typeof response.encryptionKey) === 'string').toBeTruthy();
        });
      });

      describe('ERROR', () => {
        test('when user is invalid', async () => {
          const response = await auth(UserModelMock.userNotExists)(req, res, next);

          expect(response.message).toBe('Key inválida');
        });

        test('when there is an internal error', async () => {
          const response = await auth(UserModelMock.internalError)(req, res, next);

          expect(response.err.message).toBe('Some Error');
        });
      });
    });
  });
});
