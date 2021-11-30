const transporter = require ('../configs/mail');

module.exports = (from, to, subject, text, html) => {
  const message = {
    from,
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail (message);
};
// 'admins@ad.com',
// `{user}@us.com`,
// `Welcome to ABC system {user.first_name} {user.last_name}`,
// 'Hi {first_name}, Please confirm your email address',
// '<p>Hi {first_name}, Please confirm your email address</p>',
