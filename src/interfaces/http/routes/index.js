const router = require('express').Router({ mergeParams: true });
const routerApi = require('express').Router();

const middlewares = require('../middlewares');
const setKeyAndEnvironment = require('../middlewares/setKeyAndEnvironment');
const authMiddleware = require('../middlewares/auth');

const userRoute = require('./user');
const transactionRoute = require('./transaction');
const payableRoute = require('./payable');
const routeNotFound = require('./notFound');
const healthServerRoute = require('./healthServer');
const swagger = require('../swagger/swagger');

router.use(swagger);

router.use(middlewares);

router.use(userRoute);

router.use(setKeyAndEnvironment);
router.use(authMiddleware);

router.use(transactionRoute);
router.use(payableRoute);
router.use(healthServerRoute);
router.use(routeNotFound);

routerApi.use('/:infraVersion', router);

module.exports = routerApi;
