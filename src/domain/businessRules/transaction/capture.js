const brandBusinessRules = require('../brand/capture');
const payableBusinessRules = require('../payable/create');

const capture = async ({
  authorizationCode, brand, paymentMethod, value,
}, clients) => {
  const auth = await brandBusinessRules({
    authorizationCode, brand,
  }, clients);

  return auth
    ? payableBusinessRules({ paymentMethod, value })
    : null;
};

module.exports = capture;
