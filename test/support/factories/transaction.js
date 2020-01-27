const transactionRepositoryMock = {
  success: (payload) => ({
    create: () => () => payload,
    findAll: () => [payload],
  }),
  internalError: () => ({
    create: () => () => { throw new Error('Some Error'); },
    findAll: () => { throw new Error('Some Error'); },
  }),
};

module.exports = transactionRepositoryMock;
