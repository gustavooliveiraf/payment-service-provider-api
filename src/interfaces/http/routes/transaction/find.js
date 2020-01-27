const router = require('express').Router();

const routesVersioning = require('../../middlewares/routesVersioning');

const validatorAndParser = require('../../validatorsAndParsers/transaction/find');
const controllerV1 = require('../../../../controllers/v1/transaction/find')();

router.get('/transactions/:id', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
