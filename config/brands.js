const visa = {
  baseURL: process.env.VISA_BASEURL,
  timeout: process.env.VISA_TIMEOUT,
  apiKey: process.env.VISA_APIKEY,
};

const mastercard = {
  baseURL: process.env.MASTERCARD_BASEURL,
  timeout: process.env.MASTERCARD_TIMEOUT,
  apiKey: process.env.MASTERCARD_APIKEY,
};

module.exports = {
  visa,
  mastercard,
};
