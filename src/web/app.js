const app = require('express')();
const routers = require('./routes');
const swagger = require('./swagger/swagger');
const middlewares = require('./middlewares/routeIndependent');

app.use(swagger);
app.use(middlewares);
app.use(routers);

module.exports = app;
