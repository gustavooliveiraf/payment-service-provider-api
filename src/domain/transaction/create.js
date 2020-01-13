const creditCardType = require('credit-card-type');
const paymentMethod = require('../../infra/database/enums/transaction/paymentMethod');
const clients = require('../../services/clients');


const create = async (req, res, next) => {
  try {
    req.payload.paymentMethod = paymentMethod[req.payload.paymentMethod];
    const typeFlag = creditCardType(req.payload.cardNumber)[0].type;
    const client = clients[typeFlag];

    const responseFlag = (await client.post('/transaction', { value: req.payload.value })).data;

    if (!responseFlag.capturedValue || !responseFlag.authorizedValue
      || req.payload > responseFlag.capturedValue
      || responseFlag.capturedValue > responseFlag.authorizedValue) {
      throw new Error('Erro com a bandeira');
    }

    req.payload.capturedValue = responseFlag.capturedValue;
    req.payload.authorizedValue = responseFlag.authorizedValue;

    return next();
  } catch (err) {
    return res.error(err);
  }
};

module.exports = create;
