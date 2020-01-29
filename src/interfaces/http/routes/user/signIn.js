const router = require('express').Router();
const validator = require('../../validatorsAndParsers/user/find');

const routesVersioning = require('../../middlewares/routesVersioning');

const controllerV1 = require('../../../../controllers/v1/user/find')();
// const controllerV2 = require('../../../../controllers/v1/user/find');

/**
 * @swagger
 * /1/user/sign-in:
 *   post:
 *     tags:
 *       - User
 *     summary: User login and get keys
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
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *               example: test@gmail.com
 *             password:
 *               type: string
 *               format: password
 *               required: true
 *               example: "test"
 *     responses:
 *       '200':
 *         description: User login and get keys
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 *       '400':
 *         description: Invalid user
 */

router.post('/user/sign-in', validator, routesVersioning(controllerV1)); // dependency injection

module.exports = router;
