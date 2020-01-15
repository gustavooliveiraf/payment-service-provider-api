const router = require('express').Router({ mergeParams: true });

const {
  constant: { numberOfVersions },
  message,
} = require('../../../app/utils');

router.use((req, res, next) => {
  const infraVersion = Number.parseFloat(req.params.infraVersion);

  if (!Number.isInteger(infraVersion) || (infraVersion > numberOfVersions || infraVersion <= 0)) {
    return res.badRequest({ message: message.infraVersion });
  }

  req.infraVersion = `dbv${infraVersion}`;

  return next();
});

module.exports = router;
