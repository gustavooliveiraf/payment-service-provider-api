/* eslint-disable no-return-await */
const modelVersions = require('../../src/infra/database/orm/sequelize/models').jests;

const truncate = async (model, env) => modelVersions[env][model].destroy({ where: {} });

const truncateAll = (arrayModel, env) => arrayModel.map(async (model) => (model !== 'sequelize' ? (await truncate(model, env)) : null));

const truncateAllPromiseAll = (arrayModel, env) => arrayModel.map((model) => (model !== 'sequelize' ? truncate(model, env) : null));

module.exports = {
  truncate,
  truncateAll,
  truncateAllPromiseAll,
};
