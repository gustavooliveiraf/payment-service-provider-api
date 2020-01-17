const router = require('express').Router({ mergeParams: true });

const {
  constants: { amountInfraVersions },
  messages: { wrongInfraVersion },
} = require('./utils');

router.use((req, res, next) => {
  const infraVersion = Number.parseFloat(req.params.infraVersion);

  if (!Number.isInteger(infraVersion)
    || (infraVersion > amountInfraVersions || infraVersion <= 0)) {
    return res.badRequest({ message: wrongInfraVersion });
  }

  req.infraVersion = `dbv${infraVersion}`;

  return next();
});

module.exports = router;
