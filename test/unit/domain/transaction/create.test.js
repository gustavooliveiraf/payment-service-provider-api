const nock = require('nock');
const uuid = require('uuid/v1');
/* === dependency injection in the domain === */
const creditCardType = require('credit-card-type');
const clients = require('../../../../src/services/clients');
/* === dependency injection in the domain === */
const transactionDomain = require('../../../../src/domains/businessRules/transaction/create');
const { transaction, card } = require('../../../support/models/transaction/request');
const { visa: { baseURL } } = require('../../../../config/brands');
// const { visa: { baseURL } } = require('../../../../config/brands');
// ...

describe('domain', () => {
  describe('transaction', () => {
    describe('create', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          const payload = {
            transaction: transaction(),
            card: card(),
          };

          const scope = nock(baseURL)
            .post('/transaction')
            .reply(200, {
              status: 'authorized',
              authorizedValue: payload.transaction.value,
              capturedValue: payload.transaction.value,
              authorizationCode: uuid(),
            });

          const response = await transactionDomain(payload, creditCardType, clients);

          expect(scope.isDone()).toBeTruthy();
          expect(typeof response.card === 'object' && response.card !== null).toBeTruthy();
          expect(typeof response.transaction === 'object' && response.transaction !== null).toBeTruthy();
          expect(typeof response.card.number === 'string').toBeTruthy();
          expect(Number.isInteger(parseInt(response.transaction.value, 10))).toBeTruthy();
        });
      });
    });
  });
});
