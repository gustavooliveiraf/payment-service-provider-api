const router = require('express').Router();
const creditCardType = require('credit-card-type'); // dependency injection

const validatorAndParser = require('../../validatorsAndParsers/transaction/create');
const domain = require('../../../../domain/businessRules/transaction/create.js');
const controller = require('../../../../app/transaction/create');

const clients = require('../../../../services/clients'); // dependency injection

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags:
 *       - Transaction
 *     name: Create Transaction
 *     summary: Create Transaction
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: api_key
 *         schema:
 *           type: string
 *           format: token
 *           example: test_0c82a54f22f775a3ed8b97b2dea74036
 *         required: true
 *         description: They are responsible for api authentica and associating account transactions
 *     responses:
 *       '200':
 *         description: Ok
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */
router.post('/transactions', validatorAndParser, domain(creditCardType, clients), controller());

module.exports = router;
