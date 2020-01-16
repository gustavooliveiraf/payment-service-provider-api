const payable = require('../payable/create');
const brandSchema = require('../schemas/brand/transactionCreate');

const create = (creditCardType, brandClients) => async (req, res, next) => {
  try {
    const brandTypeArray = creditCardType(req.payload.card.number);

    if (brandTypeArray.length > 1) throw new Error('Erro com a numeração do cartão');

    const brandType = brandTypeArray[0].type;
    const brandClient = brandClients[brandType];

    const brandResponse = (await brandClient.post('/transaction', {
      api_key: process.env.VISA_APIKEY,
      capture: req.payload.transaction.capture,
      value: req.payload.transaction.value,
      ...req.payload.card,
    })).data;

    const brandPayload = await brandSchema.validateAsync(brandResponse);

    if (brandPayload.capturedValue > brandPayload.authorizedValue
      || (brandPayload.status === 'authorized' && !brandPayload.authorizationCode)) throw new Error('Erro com a bandeira');

    req.payload.card.brand = brandType;

    req.payload.transaction = {
      ...req.payload.transaction,
      status: brandPayload.status,
      refuseReason: brandPayload.refuseReason,
      capturedValue: brandPayload.capturedValue,
      authorizedValue: brandPayload.authorizedValue,
      authorizationCode: brandPayload.authorizationCode,
    };

    if (brandPayload.status === 'refused') {
      return next();
    }

    req.payload.payable = req.payload.capture !== false
      ? payable(req.payload.transaction)
      : null;

    return next();
  } catch (err) {
    return res.error(err);
  }
};

module.exports = create;
