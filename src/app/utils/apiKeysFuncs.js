const { prefixApiKeyTest, prefixApiKeyProd } = require('./constants');

const prefixLengthApiKey = prefixApiKeyTest.length;

const formatApiKeys = (keys) => ({
  ...keys,
  apiKeyTest: `${prefixApiKeyTest}${keys.apiKeyTest}`,
  encryptionKeyTest: `${prefixApiKeyTest}${keys.encryptionKeyTest}`,
  apiKeyProd: `${prefixApiKeyProd}${keys.apiKeyProd}`,
  encryptionKeyProd: `${prefixApiKeyProd}${keys.encryptionKeyProd}`,
});

const parserApiKey = (key) => {
  const prefix = key.substring(0, prefixLengthApiKey);

  return prefix === prefixApiKeyTest
    ? { test: key.substring(prefixLengthApiKey) }
    : { prod: key.substring(prefixLengthApiKey) };
};

module.exports = {
  formatApiKeys,
  parserApiKey,
};
