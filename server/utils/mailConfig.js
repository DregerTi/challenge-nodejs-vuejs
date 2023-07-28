const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: 'digitalanalyticsFR@gmail.com',
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: '1//04MKiFAXSEFRGCgYIARAAGAQSNwF-L9Ir-W1UxuI_ICilUgYfC7SOM_L4qZnHtmDmFDXBh_8vlUxccHWcGbptmJAQq5HG0Y2aiv4',
    accessToken: 'ya29.a0AbVbY6MhYgd42FE5f_ik1Ea1S3F5dgmF2lNPaZqmbEzdaTjz0M99fkHBrcIphRwumiCmvPJBnpdTJ6xRQiloFsfG_lqo90ggzQq4Dmqc6e41DnnmxFLrrAg_1dJKV21olc2gilKfo5mrng_Q-RYOhtKjSUVjaCgYKAWMSARESFQFWKvPlsW2NeL0QJeqLKCHhnyhvLQ0163'
}
});

module.exports = transporter;
