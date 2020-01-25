const msIn3Hours = 180 * 60 * 1000;
const msIn1Minute = 60 * 1000;

const format = (date) => (date.getTimezoneOffset() === 180
  ? (new Date(date - msIn3Hours)).toISOString()
  : (new Date(date - date.getTimezoneOffset() * msIn1Minute)).toISOString());

module.exports = format;
