const userRepositoryDefault = require('../../../infra/repositories/raw/pg/payable/listActiveEmailAndBalance');
// const userModel = require('../../../domains/entities/user/user');

const listActiveEmails = (repository) => async (infraVersion, env) => {
  const users = await repository.listActiveEmailAndBalance(infraVersion, env);

  return users;
};

module.exports = (repository = userRepositoryDefault) => listActiveEmails(repository);
