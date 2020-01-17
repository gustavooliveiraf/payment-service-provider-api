const express = require('express');
const compression = require('compression');

const bodyParser = express.json();
const requestLogger = require('./requestLogger');
const checkSetContentType = require('./checkSetContentType');
const responseHandler = require('./responseHandler');
const setInfraVersion = require('./setInfraVersion');
const setKeyAndEnvironment = require('./setKeyAndEnvironment');
const setApiVersion = require('./setApiVersion');

const router = express.Router({ mergeParams: true });

router.use(compression());
router.use(bodyParser);

router.use(requestLogger);

router.use(responseHandler);
router.use(checkSetContentType);
router.use(setInfraVersion);
router.use(setKeyAndEnvironment);
router.use(setApiVersion);

module.exports = router;
