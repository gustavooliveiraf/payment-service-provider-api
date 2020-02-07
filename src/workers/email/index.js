/* eslint-disable no-console */
const cron = require('node-cron');
const sendEmail = require('./sendEmail');
require('../../../config');

const schedule = process.env.SCHEDULE;

cron.schedule(schedule, async () => {
  sendEmail();
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
});
