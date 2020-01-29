/* eslint-disable global-require */
/* eslint-disable no-console */
if (!process.env.production) {
  const appMocker = require('./appMocker');

  const startMocker = async () => appMocker.listen(5000,
    () => console.log(`[mocker ${process.pid}] Listening at port ${5000}`));

  startMocker()
    .catch(() => {
      // logger.error(err.stack);
      process.exit();
    });
}
