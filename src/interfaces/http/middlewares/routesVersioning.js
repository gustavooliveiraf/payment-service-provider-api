/* eslint-disable func-names */
function routesVersioning(...args) {
  return function (req, res, next) {
    return args[req.apiVersion](req, res, next);
  };
}

module.exports = routesVersioning;
