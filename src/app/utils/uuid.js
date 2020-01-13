const uuid = require('uuid/v1');

const generateWithoutHyphen = () => uuid().replace(/-/g, ''); // split.join higher cost

module.exports = generateWithoutHyphen;
