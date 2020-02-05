const payableBusinessRules = require('../payable/create');
const brandBusinessRules = require('../brand/create');

const create = async (payload, creditCardType, brandClients) => {
  const { card } = payload;
  let { transaction } = payload;
  let payable;

  const brandPayload = await brandBusinessRules(payload, creditCardType, brandClients);

  card.brand = brandPayload.brandType;

  transaction = {
    ...transaction,
    status: brandPayload.status,
    refuseReason: brandPayload.refuseReason,
    capturedValue: brandPayload.capturedValue,
    authorizedValue: brandPayload.authorizedValue,
    authorizationCode: brandPayload.authorizationCode,
    captureMethod: brandPayload.captureMethod,
  };

  if (brandPayload.status === 'authorized') {
    payable = payload.transaction.capture !== false
      ? payableBusinessRules(payload.transaction)
      : null;
  }

  return {
    card,
    transaction,
    payable,
  };
};

module.exports = create;
