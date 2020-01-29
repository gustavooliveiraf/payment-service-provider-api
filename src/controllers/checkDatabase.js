const dbVersions = require('../infra/database/orm/sequelize/models');

const start = async () => {
  const results = [];
  const keys = Object.keys(dbVersions);
  const { length } = keys;
  for (let key = 0; key < length; key += 1) {
    results.push(dbVersions[keys[key]].test.sequelize.authenticate());
    results.push(dbVersions[keys[key]].prod.sequelize.authenticate());
  }

  await Promise.all(results);
};

module.exports = start;
