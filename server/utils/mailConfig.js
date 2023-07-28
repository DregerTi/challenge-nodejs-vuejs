const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: 'digitalanalyticsFR@gmail.com',
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: '1//04K1N24xU7gFtCgYIARAAGAQSNwF-L9IrXU_sTCpvxeg6_LFdraxtjPRP5haDau04WBRtQXWeL01mlA7o0fBs8WmO5Sq6eerwP6Q',
    accessToken: 'ya29.a0AbVbY6PUNMf2QSQADmbXPSYeoUZBgY79XBEJfgUXswa2HxZoU5-5nCQzFM4IUwLV0J7T1SoBFM_otLqNdme5RNKr3d-_Bxm0VzovyivJfTG_V0-uu71s0AkuOaoYpS9jr0qP1g0RuLuGUS__LpWekpJrtI7OaCgYKAZASARESFQFWKvPltBn0mExaVVq21mfZGCChlg0163'
}
});

module.exports = transporter;
