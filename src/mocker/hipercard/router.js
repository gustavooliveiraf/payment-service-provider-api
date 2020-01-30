const router = require('express').Router();
const uuid = require('uuid/v1');

router.post('/hipercard/transaction', (req, res) => {
  if (req.body.value >= 100000) {
    return res.status(200).send({
      status: 'refused', refuseReason: 'Saldo insuficiente', authorizedValue: null, capturedValue: null, authorizationCode: null,
    });
  }
  const authorizedValue = req.body.value;

  const { capture } = req.body;
  const capturedValue = capture !== false
    ? req.body.value
    : null;

  const authorizationCode = uuid();
  const status = 'authorized';

  return res.status(200).send({
    status, authorizedValue, capturedValue, authorizationCode,
  });
});

router.post('/hipercard/capture', (req, res) => res.status(200).send({ auth: true }));

module.exports = router;
