/* === dependency injection in the domain === */
const creditCardType = require('credit-card-type');
const clients = require('../../../../src/services/clients');
/* === dependency injection in the domain === */
const transactionDomain = require('../../../../src/domain/businessRules/transaction/create');
const { transaction, card } = require('../../../support/models/transaction/request');

describe('domain', () => {
  describe('transaction', () => {
    describe('create', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          const payload = {
            transaction: transaction(),
            card: card(),
          };

          const response = await transactionDomain(payload, creditCardType, clients);

          expect(typeof response.card === 'object' && response.card !== null).toBeTruthy();
          expect(typeof response.transaction === 'object' && response.transaction !== null).toBeTruthy();
          expect(typeof response.card.number === 'string').toBeTruthy();
          expect(Number.isInteger(parseInt(response.transaction.value, 10))).toBeTruthy();
        });
      });
    });
  });
});
