const captureMethod = require('../../../../infra/database/enums/transaction/captureMethod');
const paymentMethod = require('../../../../infra/database/enums/transaction/paymentMethod');

const schema = require('../schemas/transaction/create');

const create = async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body);

    const card = {
      number: body.cardNumber,
      holderName: body.cardHolderName,
      expirationDate: body.cardExpirationDate,
      cvv: body.cardCvv,
    };
    const transaction = {
      value: body.value,
      capture: body.capture,
      description: body.description,
      paymentMethod: paymentMethod[body.paymentMethod],
      captureMethod: captureMethod[body.captureMethod],
      usedKey: 1,
      userId: 1,
    };

    req.payload = {};
    req.payload = { card, transaction };

    return next();
  } catch (err) {
    return res.badRequest(err.details);
  }
};

module.exports = create;
