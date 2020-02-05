const capture = async ({ authorizationCode, brand }, clients) => {
  const client = clients[brand];

  const auth = (await client.post('/capture', {
    authorizationCode,
  })).data;

  return auth.auth;
};

module.exports = capture;
