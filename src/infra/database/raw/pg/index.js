const { Pool } = require('pg');
const configVersion = require('../../../../../config/databases');

const instantiate = (infraVersion, env) => {
  const {
    username, host, password, database, port,
  } = configVersion[infraVersion][env];

  return new Pool({
    user: username,
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

const jestsTest = instantiate('jests', 'test');
const jestsProd = instantiate('jests', 'prod');

const jests = {
  test: jestsTest,
  prod: jestsProd,
};

module.exports = {
  dbv1,
  jests,
};
