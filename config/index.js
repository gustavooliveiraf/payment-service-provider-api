// eslint-disable-next-line no-unused-expressions
process.env.LOAD_ENV ? null : require('dotenv').config();

const visa = {
  baseURL: process.env.VISA_BASEURL,
  timeout: parseInt(process.env.VISA_TIMEOUT, 10),
  apiKey: process.env.VISA_APIKEY,
};

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  envDevelopment: process.env.NODE_ENV === 'development',
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  visa,
};
