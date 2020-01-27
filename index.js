require('./src/mocker/serverMocker');
const start = require('./src/controllers/app');

start()
  .catch((err) => {
    // logger.error(err.stack);
    // eslint-disable-next-line no-console
    console.log((err.stack));
    process.exit();
  });
