const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: 'digitalanalyticsFR@gmail.com',
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: '1//04Vs0r0qoWFKsCgYIARAAGAQSNwF-L9IrxDP-Y1dkY79fbxLX_7crfyAMtA8ZBx23Od9S2G-yAfGxfK2msydfMgovY8ONI5K0fq0',
    accessToken: 'ya29.a0AbVbY6P3bGY160pldNuUBUjlTsohhP96tlqNCXVh0Rwmi3kKqJTOq8RbSJgzqi82ijJGbfC4mnQ8akPZZjS6HaSyt1Irn4t99I-s_fyy5reSpT9t6cmJml863Yd--VrJjRnSlLglHBdFx1XkrgY47t-5tjVzLLIaCgYKASASARESFQFWKvPlxSGq5S2k2vHWpKrZaZ9OAw0166'
}
});

module.exports = transporter;
