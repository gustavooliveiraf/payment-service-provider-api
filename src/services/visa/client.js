const axios = require('axios');
const { visa: { baseURL, timeout, apiKey } } = require('../../../config');

const client = axios.create({
  baseURL,
  timeout,
  headers: { apiKey },
});

module.exports = client;
