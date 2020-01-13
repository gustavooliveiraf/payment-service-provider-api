/* eslint-disable no-console */
const appMocker = require('./appMocker');

const startMocker = async () => appMocker.listen(5000,
  () => console.log(`[mocker ${process.pid}] Listening at port ${5000}`));

module.exports = startMocker;
