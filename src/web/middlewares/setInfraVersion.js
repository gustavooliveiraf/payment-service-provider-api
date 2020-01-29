const router = require('express').Router({ mergeParams: true });

const {
  constants: { amountInfraVersions },
  messages: { noInfraVersion, wrongInfraVersion },
} = require('./utils');

router.use((req, res, next) => {
  if (req.params.infraVersion === 'jest') {
    req.infraVersion = 'jests';
    return next();
  }

  const infraVersion = Number.parseFloat(req.params.infraVersion);

  if (!Number.isInteger(infraVersion)) return res.badRequest({ message: noInfraVersion });

  if ((infraVersion > amountInfraVersions || infraVersion <= 0)) {
    return res.badRequest({ message: wrongInfraVersion });
  }

  req.infraVersion = `dbv${infraVersion}`;

  return next();
});

module.exports = router;
