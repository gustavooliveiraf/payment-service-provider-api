/* eslint-disable prefer-destructuring */
const invert = (obj) => {
  const toArray = Object.entries(obj);
  const objLength = toArray.length;

  const result = {};
  for (let i = 0; i < objLength; i += 1) result[toArray[i][1]] = toArray[i][0];

  return result;
};

module.exports = invert;
