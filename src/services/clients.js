const visa = require('./visa/client');
const mastercard = require('./mastercard/client');
const americanExpress = require('./mastercard/client');
const elo = require('./elo/client');
const hipercard = require('./hipercard/client');
const discover = require('./discover/client');
const jcb = require('./jcb/client');

module.exports = {
  visa,
  mastercard,
  'american-express': americanExpress,
  elo,
  hipercard,
  discover,
  jcb,
};
