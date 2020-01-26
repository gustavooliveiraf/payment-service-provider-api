const req = {}

const res = {
  status(arg) {
    this.statusCode = arg;
    return this;
  },
  send(arg) {
    this.response = arg;
    return this;
  },
  badRequest(arg) {
    this.message = arg.message;
    return this;
  },
};

const next = (err) => {
  this.err = err;
  return this;
};

module.exports = {
  req,
  res,
  next,
};
