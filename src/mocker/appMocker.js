const express = require('express');
const visaRouter = require('./visa/router');
const mastercardRouter = require('./mastercard/router');
const americanExpress = require('./american-express/router');
const discover = require('./discover/router');
const elo = require('./elo/router');
const hipercard = require('./hipercard/router');
const jcb = require('./jcb/router');

const appMocker = express();

appMocker.use(express.json());

appMocker.use(visaRouter);
appMocker.use(mastercardRouter);
appMocker.use(americanExpress);
appMocker.use(discover);
appMocker.use(elo);
appMocker.use(hipercard);
appMocker.use(jcb);

appMocker.use('*', (req, res) => res.status(200).send({ message: 'route not found' }));

module.exports = appMocker;
