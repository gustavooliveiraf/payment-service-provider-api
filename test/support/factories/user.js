const userRepositoryMock = {
  find: {
    userExists: (user) => ({
      find: () => user,
    }),
    userNotExists: {
      find: () => { throw new Error('ValidationError'); },
    },
    internalError: {
      find: () => { throw new Error('Some Error'); },
    },
  },
  findOrCreate: {
    userNotExists: (user) => ({
      findOrCreate: () => user,
    }),
    userExists: {
      findOrCreate: () => { throw new Error('ValidationError'); },
    },
    internalError: {
      findOrCreate: () => { throw new Error('Some Error'); },
    },
  },
};

module.exports = userRepositoryMock;
