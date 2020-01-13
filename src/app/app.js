/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */

const dbVersions = require('../infra/database/sequelize/models');
const server = require('../interfaces/http/server');

const start = async () => {
  const results = [];
  for (const db in dbVersions) results.push(dbVersions[db].sequelize.authenticate());

  await Promise.all(results);

  server();
};

module.exports = start;
