const nodemailer = require("nodemailer");
const transporter = require("../utils/mailConfig"); // Chemin vers votre fichier de configuration

// Fonction pour envoyer l'e-mail de confirmation
async function sendConfirmationEmail(userEmail, context = "register", id = null) {
  const link = process.env.BASE_URL;
  
  const mailOptions = {
    from: "Digital Analytics",
    to: userEmail,
  };

  switch (context) {
    case "resetPassword":
      mailOptions.subject = "Réinitialisation de votre mot de passe";
      mailOptions.text = "Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour le réinitialiser : " + link + "/reset-password/" + id;
      break;
    case "invitation":
      mailOptions.subject = "Invitation à rejoindre Digital Analytics";
      mailOptions.text = "Vous avez été invité à rejoindre Digital Analytics. Veuillez cliquer sur le lien suivant pour créer votre compte : " + link + "/invitations/" + id + "/accept";
      break;
    default:
      mailOptions.subject = "Confirmation d'inscription";
      mailOptions.text = "Merci pour votre inscription sur notre site. Votre compte a été créé avec succès.";
      break;
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