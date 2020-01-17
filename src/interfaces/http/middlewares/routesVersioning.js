/* eslint-disable func-names */
function routesVersioning(...args) {
  return function (req, res) {
    return args[req.apiVersion](req, res);
  };
}

module.exports = routesVersioning;
