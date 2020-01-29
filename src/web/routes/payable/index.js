const router = require('express').Router();
const listRouter = require('./list');
const balanceRouter = require('./balance');

router.use(listRouter);
router.use(balanceRouter);

module.exports = router;
