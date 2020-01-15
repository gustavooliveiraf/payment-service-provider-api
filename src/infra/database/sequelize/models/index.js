const ModelsLoader = require('../ModelsLoader');

const v1test = ModelsLoader('v1', 'test', __dirname);
const v1prod = ModelsLoader('v1', 'prod', __dirname);

const dbv1 = {
  test: v1test,
  prod: v1prod,
};


// const v2test = ModelsLoader('v2', 'test', __dirname);
// const v2prod = ModelsLoader('v2', 'prod', __dirname);

// const dbv2 = {
//   test: v2test,
//   prod: v2prod,
// };

module.exports = {
  dbv1,
  // dbv2
};
