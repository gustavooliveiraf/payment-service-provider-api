const router = require('express').Router();
const validatorAndParser = require('../../validatorsAndParsers/transaction/create');
const controllerV1 = require('../../../../controllers/v1/transaction/create')();
const routesVersioning = require('../../middlewares/routesVersioning');

/**
 * @swagger
 * /1/transactions:
 *   post:
 *     security:
 *      - auth: []
 *     tags:
 *      - name: Transaction
 *     summary: Create transaction
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
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             object:
 *               type: string
 *             value:
 *               type: integer
 *               required: true
 *               example: 12345
 *             description:
 *               type: string
 *               required: true
 *               example: Smartband XYZ 3.0
 *             paymentMethod:
 *               type: string
 *               required: true
 *               enum:
 *               - debit_card
 *               - credit_card
 *               default: debit_card
 *             captureMethod:
 *               type: string
 *               required: true
 *               enum:
 *               - ecommerce
 *               - magstripe
 *               - emv
 *               default: ecommerce
 *             cardNumber:
 *               type: string
 *               required: true
 *               example: "4111111111111111"
 *             cardHolderName:
 *               type: string
 *               required: true
 *               example: Teste Silva
 *             cardExpirationDate:
 *               type: string
 *               required: true
 *               example: 11/20
 *             cardCvv:
 *               type: string
 *               required: true
 *               example: "567"
 *     responses:
 *       '200':
 *         description: Created transaction
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Transaction'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */

router.post('/transactions', validatorAndParser, routesVersioning(controllerV1)); // routesVersioning(controllerV1, controllerV1, ...)

module.exports = router;
