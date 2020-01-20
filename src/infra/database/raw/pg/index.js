const { Pool } = require('pg');
const configVersion = require('../../../../../config/databases');

const instantiate = (infraVersion, env) => {
  const {
    user, host, password, database, port,
  } = configVersion[infraVersion][env];

  return new Pool({
    user,
    host,
    database,
    password,
    port,
  });
};

const v1test = instantiate('v1', 'test');
const v1prod = instantiate('v1', 'prod');

const dbv1 = {
  test: v1test,
  prod: v1prod,
};

module.exports = {
  dbv1,
};
