const router = require('express').Router();
const createRouter = require('./create');
// const readRouter = require('./read');

router.use(createRouter);
// router.use(readRouter);

module.exports = router;
