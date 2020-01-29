const router = require('express').Router();

const routesVersioning = require('../../middlewares/routesVersioning');

const validatorAndParser = require('../../validatorsAndParsers/transaction/capture');
const controllerV1 = require('../../../../controllers/v1/transaction/capture')();

/**
 * @swagger
 * /1/transactions/{id}/capture:
 *   put:
 *     security:
 *      - auth: []
 *     tags:
 *      - name: Transaction
 *     summary: Capture transactions
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
 *       - in: query
 *         name: value
 *         required: true
 *         description: value
 *         type: integer
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

router.put('/transactions/:id/capture', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
