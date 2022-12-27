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

const informAuctionWinner = async (lot) => {
  await transporter.sendMail({
    from: smtpUser,
    to: lot.lastPersonToBet.login,
    subject: `You won lot, ${lot.card.character.name} congratulations!`,
    text: '',
    html: `
      <div>
        <h1>You just bought card, ${lot.card.character.name} for ${lot.current_price}, congratulations!</h1>
      </div>
    `,
  });
};

const informLotSeller = async (lot) => {
  await transporter.sendMail({
    from: smtpUser,
    to: lot.card.owner.login,
    subject: `Card ${lot.card.character.name} has been sold, congratulations!`,
    text: '',
    html: `
      <div>
        <h1>You just sold card, ${lot.card.character.name} for ${lot.current_price}, congratulations!</h1>
      </div>
    `,
  });
};

module.exports.MailService = {
  sendActivationMail,
  informAuctionWinner,
  informLotSeller,
};
