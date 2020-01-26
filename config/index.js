// eslint-disable-next-line no-unused-expressions
process.env.LOAD_ENV ? null : require('dotenv').config();

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  production: process.env.NODE_ENV === 'production',
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  feeDebitCard: process.env.FEE_DEBIT_CARD,
  feeCreditCard: process.env.FEE_CREDIT_CARD,
};
