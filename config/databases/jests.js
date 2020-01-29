/* eslint-disable no-console */
// eslint-disable-next-line global-require
if (!process.env.LOAD_ENV) require('dotenv').config();

const test = {
  username: process.env.V1_DB_USER_JEST_TEST,
  password: process.env.V1_DB_PASSWORD_JEST_TEST,
  database: process.env.V1_DB_DATABASE_JEST_TEST,
  host: process.env.V1_DB_HOST_JEST_TEST,
  port: process.env.V1_DB_PORT_JEST_TEST,
  dialect: process.env.V1_DB_DIALECT_JEST_TEST,
  logging: process.env.V1_DB_LOGGING_JEST === 'console' ? console.log : false, // Logstash?!!
};

const prod = {
  username: process.env.V1_DB_USER_JEST_PROD,
  password: process.env.V1_DB_PASSWORD_JEST_PROD,
  database: process.env.V1_DB_DATABASE_JEST_PROD,
  host: process.env.V1_DB_HOST_JEST_PROD,
  port: process.env.V1_DB_PORT_JEST_PROD,
  dialect: process.env.V1_DB_DIALECT_JEST_PROD,
  logging: process.env.V1_DB_LOGGING_JEST_PROD === 'console' ? console.log : false, // Logstash?!!
};

module.exports = {
  test,
  prod,
};
