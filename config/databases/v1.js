/* eslint-disable no-console */
// eslint-disable-next-line global-require
if (!process.env.LOAD_ENV) require('dotenv').config();

const test = {
  user: process.env.V1_DB_USER_TEST,
  password: process.env.V1_DB_PASSWROD_TEST,
  database: process.env.V1_DB_DATABASE_TEST,
  host: process.env.V1_DB_HOST_TEST,
  port: process.env.V1_DB_PORT_TEST,
  dialect: process.env.V1_DB_DIALECT_TEST,
  logging: process.env.V1_DB_LOGGING_TEST === 'console' ? console.log : false, // Logstash?!!
};

const prod = {
  user: process.env.V1_DB_USER,
  password: process.env.V1_DB_PASSWROD,
  database: process.env.V1_DB_DATABASE,
  host: process.env.V1_DB_HOST,
  port: process.env.V1_DB_PORT,
  dialect: process.env.V1_DB_DIALECT,
  logging: process.env.V1_DB_LOGGING === 'console' ? console.log : false, // Logstash?!!
};

module.exports = {
  test,
  prod,
};
