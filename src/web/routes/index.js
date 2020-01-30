const router = require('express').Router({ mergeParams: true });
const routerApi = require('express').Router();

const { production } = require('../../../config');

const setInfraVersion = require('../middlewares/setInfraVersion');
const setApiVersion = require('../middlewares/setApiVersion');
const setKeyAndEnvironment = require('../middlewares/setKeyAndEnvironment');
const auth = require('../middlewares/auth');

const userRoute = require('./user');
const transactionRoute = require('./transaction');
const payableRoute = require('./payable');
const routeNotFound = require('./notFound');
const healthServerRoute = require('./healthServer');

const errorHandler = require('../errors/errorHandler');
const devErrorHandler = require('../errors/devErrorHandler');

router.use(setInfraVersion);
router.use(setApiVersion);

router.use(userRoute);

router.use(setKeyAndEnvironment);
router.use(auth);

router.use(transactionRoute);
router.use(payableRoute);
router.use(healthServerRoute);
router.use(routeNotFound);

routerApi.use('/:infraVersion', router);

routerApi.use(production ? errorHandler : devErrorHandler);

module.exports = routerApi;
