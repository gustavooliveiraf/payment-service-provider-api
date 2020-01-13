const start = require('./src/app/app');
const { envDevelopment } = require('./config');

start()
  .catch((err) => {
    // logger.error(err.stack);
    // eslint-disable-next-line no-console
    console.log((err.stack));
    process.exit();
  });

if (envDevelopment) {
  // eslint-disable-next-line global-require
  const startMocker = require('./src/mocker/serverMocker');

  startMocker()
    .catch((err) => {
      // logger.error(err.stack);
      // eslint-disable-next-line no-console
      console.log((err.stack));
      process.exit();
    });
}
