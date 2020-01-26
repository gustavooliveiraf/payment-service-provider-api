const start = require('./src/controllers/app');
const { production } = require('./config');

start()
  .catch((err) => {
    // logger.error(err.stack);
    // eslint-disable-next-line no-console
    console.log((err.stack));
    process.exit();
  });

if (!production) {
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
