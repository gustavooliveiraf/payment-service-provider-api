const router = require('express').Router();

router.post('/transaction', (req, res) => {
  const authorizedValue = req.payload.value;

  const { capture } = req.payload;
  const capturedValue = capture
    ? req.body.value
    : null;

  res.status(200).send({ authorizedValue, capturedValue });
});

module.exports = router;
