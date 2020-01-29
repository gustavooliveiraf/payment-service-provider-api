const router = require('express').Router({ mergeParams: true });

const {
  constants: { apiVersions },
  messages: { noApiVersions, wrongApiVersions },
} = require('./utils');

router.use((req, res, next) => {
  const apiVersion = req.headers['x-pagarme-version'];

  if (!apiVersion) return res.badRequest({ message: noApiVersions });

  if (!apiVersions.includes(apiVersion)) {
    return res.badRequest({ message: wrongApiVersions });
  }

  // despising the letter v (v1, v2, ...) and subtracting 1 to be the controller vector index in
  // the middleware "routesVersioning"
  req.apiVersion = parseInt(apiVersion.substring(1), 10) - 1;

  return next();
});

module.exports = router;
