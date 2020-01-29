const request = require('supertest');
const app = require('../../src/web/app');

module.exports = request(app);
