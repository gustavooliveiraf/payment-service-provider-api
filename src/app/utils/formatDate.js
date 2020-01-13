const { msOffsetBrazil } = require('./constants');

module.exports = (date) => {
  const dateBrazil = new Date(date.valueOf() - msOffsetBrazil);

  return `${dateBrazil.toTimeString().substr(0, 8)} ${
    dateBrazil.toLocaleDateString().split('-').reverse().join('/')}`;
};
