const userModel = (userTest, userProd, jwtGenerator) => {
  const test = {
    apiKey: userTest.apiKey,
    encryptionKey: userTest.encryptionKey,
  };
  const prod = {
    apiKey: userProd.apiKey,
    encryptionKey: userProd.encryptionKey,
  };

  const { active, email } = { ...userTest };
  const token = jwtGenerator({ test, prod });

  return {
    active,
    email,
    test,
    prod,
    token,
  };
};

module.exports = userModel;
