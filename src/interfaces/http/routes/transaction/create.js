const router = require('express').Router();
const validator = require('../../validators/transaction/create');
const domain = require('../../../../domain/transaction/create.js');
const controller = require('../../../../app/transaction/create');
const repository = require('../../../../infra/repositories/sequelize/transaction/create');

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
 *         description: They are responsible  for api authentication and associating account transactions
 *     responses:
 *       '200':
 *         description: Ok
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */
router.post('/transactions', validator, domain, controller(repository));

module.exports = router;
