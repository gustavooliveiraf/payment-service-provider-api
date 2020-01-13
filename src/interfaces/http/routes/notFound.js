const router = require('express').Router();
const { routeNotFound } = require('../../../app/utils/staticMessages');

router.all('*', (_, res) => res.notFound(routeNotFound));

module.exports = router;
