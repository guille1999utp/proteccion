const nodemailer = require("nodemailer");
const validator = require("validator");
const ValidateEmail = require("./validateEmail");

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail", // O puedes usar otro servicio como SendGrid o Amazon SES
  auth: {
    user: process.env.CORREO_SECRET, // generated ethereal user
    pass: process.env.GOOGLE_SECRET, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("conectado nodemailer para correo");
  })
  .catch((err) => {
    console.log(err);
  });

// Función para enviar el correo
async function sendFibonacciEmail(recipientEmail, time, fibonacciSeries) {
  if (!validator.isEmail(recipientEmail)) {
    throw new Error("El formato del correo electrónico es inválido.");
  }

  // Verificar la validez del correo electrónico usando Listenclean
  const emailValidation = await ValidateEmail(recipientEmail);
  console.log(emailValidation);
  if (emailValidation?.data?.status == "dirty") {
    throw new Error(
      "La dirección de correo electrónico no es válida o no existe."
    );
  }

  const mailOptions = {
    from: "passphg@gmail.com",
    to: recipientEmail,
    subject: "Serie Fibonacci Generada",
    text: `La serie Fibonacci generada a las ${time} es: ${fibonacciSeries.join(
      ", "
    )}.\n\n¡Gracias por usar nuestro servicio!`,
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error al enviar correo", error);
      } else {
        console.log("correo enviado", info.response);
      }
    });
    console.log("Correo enviado correctamente a", recipientEmail);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo electrónico.");
  }
}

module.exports = sendFibonacciEmail;