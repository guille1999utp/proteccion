const nodemailer = require("nodemailer");
const validator = require("validator");
const ValidateEmail = require("./validateEmail");

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.CORREO_SECRET,
    pass: process.env.GOOGLE_SECRET,
  },
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

// Verificación de conexión
async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("Conectado Nodemailer para correo");
  } catch (err) {
    console.error("Error en la verificación de transporte:", err);
    throw new Error("No se pudo verificar el transporte de correo.");
  }
}

// Función para enviar el correo
async function sendFibonacciEmail(recipientEmail, time, fibonacciSeries) {
  if (!validator.isEmail(recipientEmail)) {
    throw new Error("El formato del correo electrónico es inválido.");
  }

  // Verificar la validez del correo electrónico usando Listenclean
  const emailValidation = await ValidateEmail(recipientEmail);

  if (emailValidation?.data?.status === "dirty") {
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
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente a", recipientEmail);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo electrónico.");
  }
}

module.exports = sendFibonacciEmail;
