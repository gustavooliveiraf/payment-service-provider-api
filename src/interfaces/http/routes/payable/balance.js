const router = require('express').Router();

const routesVersioning = require('../../middlewares/routesVersioning');

const validatorAndParser = require('../../validatorsAndParsers/payable/balance');
const controllerV1 = require('../../../../app/v1/payable/balance')();

/**
 * @swagger
 * /1/payables/balance:
 *   get:
 *     security:
 *      - auth: []
 *     tags:
 *       - Payable
 *     summary: Balance
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: status
 *         type: string
 *         required: true
 *         enum: [paid, waiting_funds]
 *         default: waiting_funds
 *         description: Filter
 *       - name: X-PagarMe-Version
 *         in: header
 *         required: true
 *         type: string
 *         enum: [v1]
 *         default: v1
 *         description: Versão da api
 *     responses:
 *       '200':
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Balance'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */

router.get('/payables/balance', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
