const Time = require("../models/time");
const generateFibonacciSeries = require("../utils/fibonacci");
const sendFibonacciEmail = require("../utils/nodemailer");

// Definimos la funcion para capturar todos los horarios solicitados
const getAllFibonnaci = async (req, res) => {
  try {
    const db = await Time.find(); // Leer la base de datos
    res.status(200).json(db); // Retornar la base de datos como respuesta
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Definimos la funcion para crear una nueva serie de Fibonacci
createFibbonaci = async (req, res) => {
  try {
    const { time, emails } = req.body;

    if (!time || !/^\d{2}:\d{2}:\d{2}$/.test(time)) {
      return res
        .status(400)
        .json({ error: "Formato de hora inválido. Debe ser HH:mm:ss." });
    }

    const [hours, minutes, seconds] = time.split(":").map(Number);

    // Extraer la última cifra de minutos y segundos para usar como semillas
    const seed1 = Math.floor(minutes / 10);
    const seed2 = minutes % 10;
    const count = seconds;

    const fibonacciSeries = generateFibonacciSeries(seed1, seed2, count);

    // Crear una nueva entrada en la base de datos
    const newTime = new Time({ time, fibonacciSeries });
    await newTime.save(); // Guardar la nueva entrada en la base de datos

    // Enviar un correo a cada destinatario
    for (const email of emails) {
      await sendFibonacciEmail(email, time, fibonacciSeries);
    }

    res.status(201).json({ fibonacciSeries });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error al crear la tarea. ${error.message}` });
  }
};

module.exports = { getAllFibonnaci, createFibbonaci };
