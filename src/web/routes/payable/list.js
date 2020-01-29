const router = require('express').Router();

const routesVersioning = require('../../middlewares/routesVersioning');

const validatorAndParser = require('../../validatorsAndParsers/payable/list');
const controllerV1 = require('../../../controllers/v1/payable/list')();

/**
 * @swagger
 * /1/payables:
 *   get:
 *     security:
 *      - auth: []
 *     tags:
 *       - Payable
 *     summary: List payables
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: X-PagarMe-Version
 *         in: header
 *         required: true
 *         description: Versão da api
 *         type: string
 *         enum: [v1]
 *         default: v1
 *       - in: query
 *         name: status
 *         type: string
 *         required: true
 *         enum: [paid, waiting_funds]
 *         default: waiting_funds
 *         description: Filter
 *     responses:
 *       '200':
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Payable'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */

router.get('/payables', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
