/* eslint-disable no-return-assign */
const formatDate = (model, ...keys) => {
  const modelTemp = { ...model };
  keys.forEach((key) => modelTemp.dataValues[key] = model.get(key));

  return modelTemp;
};

module.exports = formatDate;
