/* eslint-disable no-console */
const app = require('express')();

const { port } = require('../../../config');
const routers = require('./routes');

const start = () => {
  app.use(routers);

  app.listen(port, () => console.log(`[p ${process.pid}] Listening at port ${port}`));
};

module.exports = start;
