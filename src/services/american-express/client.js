const axios = require('axios');
const { visa: { baseURL, timeout, apiKey } } = require('../../../config/brands');

const timeoutInt = parseInt(timeout, 10);

const client = axios.create({
  baseURL,
  timeout: timeoutInt,
  headers: { apiKey },
});

module.exports = client;
