module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createSchema('users');
    await queryInterface.createSchema('transaction');
    await queryInterface.createSchema('payable');
    await queryInterface.createSchema('register');
  },
};
