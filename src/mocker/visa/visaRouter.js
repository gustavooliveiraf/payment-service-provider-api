const router = require('express').Router();

router.post('/transaction', (req, res) => res.status(200).send({
  authorizedValue: req.body.value,
  capturedValue: req.body.value,
}));

module.exports = router;
