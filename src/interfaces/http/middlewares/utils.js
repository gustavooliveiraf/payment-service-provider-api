const constants = {
  prefixAkTest: 'ak_test_',
  prefixAkProd: 'ak_prod_',
  prefixEkTest: 'ek_test_',
  prefixEkProd: 'ek_prod_',
  basicAuthApiKeyName: 'api_key',
  apiVersions: ['v1'], // ['v1', 'v2'] ...
  amountInfraVersions: 1,
};

const messages = {
  noInfraVersion: 'Versão no parâmetro deve ser um inteiro (ex: url/1/transactions)',
  wrongInfraVersion: 'Versão no parâmetro inexistente',
  noApiVersions: 'Versão da api inexistente no Header',
  wrongApiVersions: 'Versão da api inexistente',
};

module.exports = {
  constants,
  messages,
};
