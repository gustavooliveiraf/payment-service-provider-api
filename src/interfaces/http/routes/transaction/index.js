const router = require('express').Router();
const createRouter = require('./create');
const findRouter = require('./find');
const listRouter = require('./list');

router.use(createRouter);
router.use(findRouter);
router.use(listRouter);

module.exports = router;
