/* eslint-disable no-console */
// eslint-disable-next-line no-unused-expressions
process.env.LOAD_ENV ? null : require('dotenv').config();

const config = {
  username: process.env.V1_DB_USERNAME,
  password: process.env.V1_DB_PASSWROD,
  database: process.env.V1_DB_DATABASE,
  host: process.env.V1_DB_HOST,
  port: process.env.V1_DB_PORT,
  dialect: process.env.V1_DB_DIALECT,
  logging: process.env.V1_DB_LOGGING === 'console' ? console.log : false, // Logstash?!!
};

module.exports = config;
