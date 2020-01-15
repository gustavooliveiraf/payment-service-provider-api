const router = require('express').Router();
const validator = require('../../validatorsAndParsers/user/create');
const controller = require('../../../../app/user/create');

/**
 * @swagger
 * /user/sign-up:
 *   post:
 *     tags:
 *       - Users
 *     name: Sign-up
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: payload
 *         in: body
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 *     responses:
 *       '201':
 *         description: User created
 *       '400':
 *         description: Username or email already taken
 */
router.post('/user/sign-up', validator, controller()); // dependency injection

module.exports = router;
