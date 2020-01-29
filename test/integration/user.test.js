const request = require('../support/request');
const { truncate } = require('../support/truncate');
const { UserModelRequestRandom } = require('../support/models/user');
const schemaResponseUser = require('./schemas/user');
const genericFailure = require('./schemas/genericFailure');

// afterAll(async () => Promise.all(truncateAll('test').concat(truncateAll('prod'))));
afterAll(async () => Promise.all([truncate('User', 'test'), truncate('User', 'prod')]));

describe('integration', () => {
  describe('user', () => {
    let userExists;

    describe('signUp', () => {
      describe('sucess', () => {
        test('when user is valid and does not exist', async () => {
          const user = UserModelRequestRandom();

          const response = await request.post('/jest/user/sign-up')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(200);

          const value = await schemaResponseUser.validateAsync(response.body);
          userExists = value;

          expect(value.test.email).toBe(user.email.toLowerCase());
          expect(value.test.email).toBe(value.prod.email);
        });
      });

      describe('error', () => {
        test('when user is valid and exists', async () => {
          const response = await request.post('/jest/user/sign-up')
            .send({
              email: userExists.test.email,
              password: UserModelRequestRandom().password,
            })
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(400);

          const value = await genericFailure.validateAsync(response.body);

          expect(value.error.invalide_key).toBe('email');
        });
        test('when user is invalid - email', async () => {
          const response = await request.post('/jest/user/sign-up')
            .send({
              password: UserModelRequestRandom().password,
            })
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(400);

          const value = await genericFailure.validateAsync(response.body);

          expect(value.error.context.key).toBe('email');
          expect(value.error.type).toBe('invalid_parameter');
        });
        test('when user is invalid - password', async () => {
          const response = await request.post('/jest/user/sign-up')
            .send({
              email: UserModelRequestRandom().email,
            })
            .set('Content-Type', 'application/json')
            .set('X-PagarMe-Version', 'v1')
            .expect(400);

          const value = await genericFailure.validateAsync(response.body);

          expect(value.error.context.key).toBe('password');
          expect(value.error.type).toBe('invalid_parameter');
        });
      });
    });
  });
});
