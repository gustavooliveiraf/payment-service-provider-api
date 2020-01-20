const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const configVersion = require('../../../../../../config/databases');

const basename = path.basename(__filename);
const namespace = cls.createNamespace('my-session');
Sequelize.useCLS(namespace);

const ModelsLoader = (sequelize) => {
  const db = {};

  fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      const modelName = file.substring(0, file.length - 3);
      db[modelName] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};

const instantiate = (infraVersion, env) => {
  const config = configVersion[infraVersion][env];
  const sequelize = new Sequelize(config.database, config.user, config.password, config);

  return ModelsLoader(sequelize, infraVersion, env);
};

const v1test = instantiate('v1', 'test');
const v1prod = instantiate('v1', 'prod');

const dbv1 = {
  test: v1test,
  prod: v1prod,
};

// const v2test = instantiate('v2', 'test');
// const v2prod = instantiate('v2', 'prod');

// const dbv2 = {
//   test: v2test,
//   prod: v2prod,
// };

module.exports = {
  dbv1,
  // dbv2
};
