const router = require('express').Router();

router.get('/health', (_, res) => res.finish({ message: `Service running - ${new Date()}.` }));
router.get('/status', (_, res) => res.finish({ message: `Service running - ${new Date()}.` }));

module.exports = router;
