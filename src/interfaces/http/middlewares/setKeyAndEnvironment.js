const {
  constants: {
    basicAuthApiKeyName, prefixAkTest, prefixAkProd, prefixEkTest, prefixEkProd,
  },
} = require('./utils');

const prefixApiKeyTestLength = prefixAkTest.length;

const getApiKeyHeader = (auth) => {
  if (!auth) return undefined;

  const tmp = auth.split(' ');
  const buf = Buffer.from(tmp[1], 'base64');
  const plainAuth = buf.toString();

  const credentials = plainAuth.split(':');
  const username = credentials[0];
  const password = credentials[1];

  if (password === basicAuthApiKeyName) return username;

  return false;
};

const getApiKey = (req, res, next) => {
  const key = req.body.api_key
    || req.headers.api_key
    || req.query.api_key
    || getApiKeyHeader(req.headers.authorization);

  if (!key) return res.badRequest({ message: 'api_key está faltando', invalid_key: 'api_key' });

  const prefix = key.substring(0, prefixApiKeyTestLength);
  if (prefix !== prefixAkTest && prefix !== prefixAkProd
    && prefix !== prefixEkTest && prefix !== prefixEkProd) return res.unauthorized();

  req.usedKey = key.substring(0, 2) === 'ak' ? 'apiKey' : 'encryptionKey';
  req.key = key.substring(prefixApiKeyTestLength);
  req.env = (prefix === prefixAkTest || prefix === prefixEkTest) ? 'test' : 'prod';

  return next();
};

module.exports = getApiKey;
