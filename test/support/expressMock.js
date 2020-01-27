const req = {};

const res = {
  status(arg) {
    this.statusCode = arg;
    return this;
  },
  send(arg) {
    this.response = arg;
    return this;
  },
  finish(arg) {
    this.response = arg;
    return this;
  },
  badRequest(arg) {
    this.badRequestResponse = arg;
    return this;
  },
  unauthorized(arg) {
    this.unauthorizedResponse = arg;
    return this;
  },
  notFound(arg) {
    this.notFoundResponse = arg;
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
