const router = require('express').Router();

const routesVersioning = require('../../middlewares/routesVersioning');

const validatorAndParser = require('../../validatorsAndParsers/transaction/find');
const controllerV1 = require('../../../../controllers/v1/transaction/find')();

/**
 * @swagger
 * /1/transactions/{id}:
 *   get:
 *     security:
 *      - auth: []
 *     tags:
 *      - name: Transaction
 *     summary: Find transactions
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: X-PagarMe-Version
 *         required: true
 *         description: Versão da api
 *         type: string
 *         enum: [v1]
 *         default: v1
 *       - in: path
 *         name: id
 *         required: true
 *         description: transactionId
 *         type: string
 *         format: uuid
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

router.get('/transactions/:id', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
