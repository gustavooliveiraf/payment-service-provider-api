const router = require('express').Router();

router.all('*', (_, res) => res.notFound('Rota não encontrada'));

module.exports = router;
