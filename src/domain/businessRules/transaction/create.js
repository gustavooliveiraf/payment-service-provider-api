const payableBusinessRules = require('../payable/create');
const brandSchema = require('../schemas/brand/transactionCreate');

const create = async (payload, creditCardType, brandClients) => {
  const { card } = payload;
  let { transaction } = payload;
  let payable;

  const brandTypeArray = creditCardType(payload.card.number);

  if (brandTypeArray.length > 1) throw new Error('Erro com a numeração do cartão');

  const brandType = brandTypeArray[0].type;
  const brandClient = brandClients[brandType];

  const brandResponse = (await brandClient.post('/transaction', {
    api_key: process.env.VISA_APIKEY,
    capture: payload.transaction.capture,
    value: payload.transaction.value,
    ...payload.card,
  })).data;

  const brandPayload = await brandSchema.validateAsync(brandResponse);

  if (brandPayload.capturedValue > brandPayload.authorizedValue
    || (brandPayload.status === 'authorized' && !brandPayload.authorizationCode)) throw new Error('Erro com a bandeira');

  card.brand = brandType;

  transaction = {
    ...transaction,
    status: brandPayload.status,
    refuseReason: brandPayload.refuseReason,
    capturedValue: brandPayload.capturedValue,
    authorizedValue: brandPayload.authorizedValue,
    authorizationCode: brandPayload.authorizationCode,
  };

  if (brandPayload.status === 'authorized') {
    payable = payload.capture !== false
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
