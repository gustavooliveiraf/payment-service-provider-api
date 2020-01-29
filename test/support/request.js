const request = require('supertest');
const app = require('../../src/interfaces/http/app');

module.exports = request(app);
