const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: 'digitalanalyticsFR@gmail.com',
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: '1//04JdBUyc4JQlyCgYIARAAGAQSNwF-L9IrSD9PNv6KrtluL_71ahttYR5Kk-wwmS7Ll5aIYa5s-QrsFxQx4M_Lgg4IH6lghf97Fe4',
    accessToken: 'ya29.a0AbVbY6MCmQiFNGmbi8p-fDrR-1LwKikpHvGpKVU76xRvg-GgZeiNBOT1gGBdjZJ0p56Qmh1ZsxOeYL8NXDX2qYqSsWmXYiTJ703KNjgm0IPvtCQE3Urtgzx830wGc3gdW-vN1xBudChbb0mhLEKWrU5Gc7GCaCgYKAUcSARESFQFWKvPlGmWJy-pOtSWRfz3uXFeQFg0163'
}
});

module.exports = transporter;
