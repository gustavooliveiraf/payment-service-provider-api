const express = require('express');
const visaRouter = require('./visa/visaRouter');
const mastercardRouter = require('./mastercard/mastercardRouter');

const appMocker = express();

appMocker.use(express.json());

appMocker.use(visaRouter);
appMocker.use(mastercardRouter);

appMocker.use('*', (req, res) => res.status(200).send({ message: 'route not found' }));

module.exports = appMocker;
