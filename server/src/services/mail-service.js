const nodemailer = require('nodemailer');
const { apiUrl, smtpUser, smtpPassword } = require('../../config').server;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

const sendActivationMail = async (userEmail, link) => {
  await transporter.sendMail({
    from: smtpUser,
    to: userEmail,
    subject: `Activate account for ${apiUrl}`,
    text: '',
    html: `
      <div>
        <h1>Activate your account by link</h1>
        <a href="${link}">${link}</a>
      </div>
    `,
  });
};

module.exports.MailService = {
  sendActivationMail,
};
