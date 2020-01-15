const router = require('express').Router({ mergeParams: true });
const routerApi = require('express').Router();

const middlewares = require('../middlewares');
const authMiddleware = require('../middlewares/auth');

const userRoute = require('./user');
const transactionRoute = require('./transaction');
const routeNotFound = require('./notFound');
const healthServerRoute = require('./healthServer');

router.use(middlewares);

router.use(userRoute);

router.use(authMiddleware);

router.use(transactionRoute);
router.use(healthServerRoute);
router.use(routeNotFound);

routerApi.use('/:infraVersion', router);

module.exports = routerApi;
