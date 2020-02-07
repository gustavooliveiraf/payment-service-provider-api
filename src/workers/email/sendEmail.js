/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const getEmails = require('../../controllers/v1/user/listActiveEmails');
require('../../../config');

const [infraVersion, env] = ['dbv1', 'test'];
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// no backpressure
const main = async () => {
  try {
    const result = await getEmails()(infraVersion, env);
    const { length } = result;
    for (let i = 0; i < length; i += 1) {
      const { email, balance } = result[i];
      const mailOptions = {
        from: 'Gustavo <desafiopagarme@gmail.com>',
        to: email,
        subject: 'Balance paid',
        html: `balance = <b>${balance}<b>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        console.log(info);
        if (err) console.log(err);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = main;
