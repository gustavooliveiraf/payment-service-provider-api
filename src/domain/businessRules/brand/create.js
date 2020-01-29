const brandSchema = require('../schemas/brand/transactionCreate');

// https://pagarme.zendesk.com/hc/pt-br/articles/204766289-Quais-bandeiras-de-cart%C3%A3o-de-cr%C3%A9dito-o-Pagar-me-aceita-
const acceptedCardsEmvMagstripe = ['visa', 'mastercard', 'american-express', 'elo', 'hipercard'];
const acceptedCardsecommerce = acceptedCardsEmvMagstripe.concat(['discover', 'jcb']);

// simulate capture method for testing purposes and understanding of the business rule
const captureMethodArray = ['ecommerce', 'emv', 'magstripe'];
const randomCaptureMethod = () => (
  captureMethodArray[Math.floor(Math.random() * captureMethodArray.length)]
);

const validateCardData = (payload, brandTypeArray, captureMethod) => {
  if (brandTypeArray.length !== 1) {
    const err = new Error('cardNumber inválido');
    err.invalid_key = 'cardNumber';
    throw err;
  }
  if (brandTypeArray[0].code.size !== payload.card.cvv.length) {
    const err = new Error('cardCvv inválido');
    err.invalid_key = 'cardCvv';
    throw err;
  }

  const brandType = brandTypeArray[0].type;

  if (captureMethod === 'ecommerce' && !acceptedCardsecommerce.includes(brandType)) throw new Error('Bandeira não aceita');
  else if (!acceptedCardsEmvMagstripe.includes(brandType)) throw new Error('Bandeira não aceita');

  return brandType;
};

const create = async (payload, creditCardType, brandClients) => {
  // get captureMethod of the request or generate random captureMethod, for simulation purposes
  const captureMethod = payload.transaction.captureMethod || randomCaptureMethod();

  const brandTypeArray = creditCardType(payload.card.number);

  const brandType = validateCardData(payload, brandTypeArray, captureMethod);

  const brandClient = brandClients[brandType];
  const brandResponse = (await brandClient.post('/transaction', {
    capture: payload.transaction.capture,
    value: payload.transaction.value,
    ...payload.card,
  })).data;

  if (brandResponse.capturedValue > brandResponse.authorizedValue
    || (brandResponse.status === 'authorized' && !brandResponse.authorizationCode)) throw new Error('Erro com a bandeira');

  if (brandResponse.refused) throw new Error('Transação não foi autorizada');

  return brandSchema.validateAsync({ ...brandResponse, brandType, captureMethod });
};

module.exports = create;
