const schema = require('../schemas/transaction/create');

const create = async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body); // { abortEarly: false }

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
      paymentMethod: body.paymentMethod,
      captureMethod: body.captureMethod,
      usedKey: req.usedKey,
      userId: req.user.id,
    };

    req.payload = {};
    req.payload = { card, transaction };

    return next();
  } catch (err) {
    return res.badRequest(err.details[0]);
  }
};

module.exports = create;
