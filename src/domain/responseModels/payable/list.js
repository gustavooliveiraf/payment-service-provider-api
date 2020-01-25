const payableResponseModel = require('./payable');

const payableModel = (payable) => {
  const list = [];
  const { length } = payable;

  for (let i = 0; i < length; i += 1) {
    list.push(payableResponseModel(payable[i].dataValues));
  }

  return {
    object: 'payable_list',
    list,
  };
};

module.exports = payableModel;
