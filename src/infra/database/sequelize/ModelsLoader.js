const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const configVersion = require('../../../../config/database');

const ModelsLoader = (infraVersion, baseFolder, indexFile = 'index.js') => {
  const config = configVersion[infraVersion];
  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  const db = {};

  fs
    .readdirSync(baseFolder)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(baseFolder, file));
      const modelName = file.substring(0, file.length - 3);
      db[modelName] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

module.exports = ModelsLoader;
