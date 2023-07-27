const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: 'digitalanalyticsFR@gmail.com',
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: '1//04wkrGVhqAIotCgYIARAAGAQSNwF-L9IrWUukkIXwNg27K6ig0AJ8DtR--difP6EScKlAfEhD1Vmffb60KtJ9HjWo9tpV6Z2cniI',
    accessToken: 'ya29.a0AbVbY6O5daazWR8XoRqqluF427DMC0WNI-4P4VRXodtupjd5CKGXhI0NDiSOFXM8HU5cnWZumvyH3z0qamIapyRxJJq6voKUg07Nbbu9b0tZ9i8wTSip5IiP0YoV7A52PhXfosNDV5d2wcZplOs4NyRO47j3yzMaCgYKAfESARESFQFWKvPlEdGb5nqlb-tCexmKyHjN4Q0166'
}
});

module.exports = transporter;
