const router = require('express').Router();
const validator = require('../../validatorsAndParsers/user/find');
const controller = require('../../../../app/user/find');

/**
 * @swagger
 * /user/sign-in:
 *   post:
 *     tags:
 *       - Users
 *     name: Sign-in
 *     summary: User login
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: payload
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: gof@cin.ufpe.br
 *             password:
 *               type: string
 *               format: password
 *               example: "123"
 *     responses:
 *       '200':
 *         description: Ok
 *       '401':
 *         description: Unauthorized
 *       '422':
 *         description: Unprocessable Entity
 */

router.post('/user/sign-in', validator, controller()); // dependency injection

module.exports = router;
