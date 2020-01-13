const ModelsLoader = require('../ModelsLoader');

const dbv1 = ModelsLoader(
  'v1',
  __dirname,
);
// const v2 = ModelsLoader('v2');
// const v3 = ModelsLoader('v3');

module.exports = {
  dbv1,
  // v2,
  // v3,
};
