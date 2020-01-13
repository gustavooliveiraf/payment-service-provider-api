class CustomError extends Error {
  constructor(err) {
    super('Custom Error');
    this.err = err;
  }
}

module.exports = CustomError;
