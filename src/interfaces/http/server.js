/* eslint-disable no-console */
const app = require('./app');
const checkDatabase = require('../../controllers/checkDatabase');
const { port } = require('../../../config');

(async () => {
  try {
    await checkDatabase();

    app.listen(port, () => console.log(`[p ${process.pid}] Listening at port ${port}`));
  } catch (err) {
    // logger.error(err.stack);
    console.log(err.stack);
    process.exit();
  }
})();
