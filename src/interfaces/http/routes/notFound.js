const router = require('express').Router();

router.all('*', (_, res) => res.notFound({ message: 'Rota não encontrada' }));

module.exports = router;
