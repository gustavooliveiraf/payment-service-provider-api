const express = require('express');
const compression = require('compression');

const bodyParser = express.json();
const requestLogger = require('./requestLogger');
const checkSetContentType = require('./checkSetContentType');
const responseWrapper = require('./responseHandler');
const infraVersion = require('./infraVersion');
const getSetKeyAndEnvironment = require('./getSetKeyAndEnvironment');

const router = express.Router({ mergeParams: true });

router.use(compression());
router.use(bodyParser);

router.use(requestLogger);

router.use(responseWrapper);
router.use(checkSetContentType);
router.use(infraVersion);
router.use(getSetKeyAndEnvironment);

module.exports = router;
