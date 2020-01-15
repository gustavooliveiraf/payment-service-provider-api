const router = require('express').Router();
const signUpRouter = require('./signUp');
const signInRouter = require('./signIn');

router.use(signUpRouter);
router.use(signInRouter);

module.exports = router;
