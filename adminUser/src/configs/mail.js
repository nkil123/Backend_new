const nodemailer = require ('nodemailer');

module.exports = nodemailer.createTransport ({
  host: 'smtp.mailtrap.io',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: '0187a68ea22f90',
    pass: 'a8f9e27aca9afe',
  },
});
