const router = require('express').Router();

const routesVersioning = require('../../middlewares/routesVersioning');

const validatorAndParser = require('../../validatorsAndParsers/transaction/list');
const controllerV1 = require('../../../controllers/v1/transaction/list')();

/**
 * @swagger
 * /1/transactions:
 *   get:
 *     security:
 *      - auth: []
 *     tags:
 *      - name: Transaction
 *     summary: List transactions
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
 *         name: count
 *         type: integer
 *         default: 10
 *       - in: query
 *         name: page
 *         type: integer
 *         default: 1
 *     responses:
 *       '200':
 *         description: Listed transactions
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Transaction'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */

router.get('/transactions', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
