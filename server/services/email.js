const nodemailer = require("nodemailer");
const transporter = require("../utils/mailConfig"); // Chemin vers votre fichier de configuration

// Fonction pour envoyer l'e-mail de confirmation
function sendConfirmationEmail(userEmail) {
  const mailOptions = {
    from: "Digital Analytics",
    to: userEmail,
    subject: "Confirmation d'inscription",
    text: "Merci pour votre inscription sur notre site. Votre compte a été créé avec succès.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Erreur lors de l'envoi de l'e-mail : ", error);
    } else {
      console.log("E-mail envoyé avec succès : ", info.response);
    }
  });
}

module.exports = { sendConfirmationEmail };