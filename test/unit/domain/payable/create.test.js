const payableDomain = require('../../../../src/domains/businessRules/payable/create');
const { transaction } = require('../../../support/models/transaction/request');

describe('domain', () => {
  describe('payable', () => {
    describe('create', () => {
      describe('sucess', () => {
        test('when transaction is valid', async () => {
          const transactionRandom = transaction();

          const response = await payableDomain(transactionRandom);

          expect(Number.isInteger(response.value)).toBeTruthy();
          expect(typeof response.status === 'string').toBeTruthy();
          expect(Number.isInteger(response.fee)).toBeTruthy();
          expect(response.paymentDate instanceof Date).toBeTruthy();
        });
      });
    });
  });
});
