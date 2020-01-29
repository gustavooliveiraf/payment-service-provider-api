const router = require('express').Router();
const validator = require('../../validatorsAndParsers/user/create');

const routesVersioning = require('../../middlewares/routesVersioning');

const controllerV1 = require('../../../controllers/v1/user/create')();
// const controllerV2 = require('../../../../controllers/v2/user/create');

/**
 * @swagger
 * /1/user/sign-up:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
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
 *               example: "123456"
 *     responses:
 *       '200':
 *         description: Registered user
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 *       '400':
 *         description: Username or email already taken
 */

router.post('/user/sign-up', validator, routesVersioning(controllerV1)); // dependency injection

module.exports = router;
