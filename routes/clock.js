const route = require("express").Router();
const {
  getAllFibonnaci,
  createFibbonaci,
} = require("./../src/controllers/fibonnaciController");

/**
 * @swagger
 * tags:
 *   name: Fibonacci
 *   description: Operaciones relacionadas con la serie Fibonacci
 */

/**
 * @swagger
 * /clock:
 *   get:
 *     summary: Obtener todas las series de Fibonacci generadas
 *     tags: [Fibonacci]
 *     responses:
 *       200:
 *         description: Lista de series de Fibonacci con las horas en las que fueron generadas
 *         content:
 *           application/json:
 *             example:
 *               - time: "15:49:08"
 *                 fibonacciSeries: [390, 241, 149, 92, 57, 35, 22, 13, 9, 4]
 *               - time: "12:23:04"
 *                 fibonacciSeries: [21, 13, 8, 5, 3, 2]
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor."
 */
route.get("/clock", getAllFibonnaci);

/**
 * @swagger
 * /clock:
 *   post:
 *     summary: Generar una serie de Fibonacci en base a la hora proporcionada
 *     tags: [Fibonacci]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             time: "15:49:08"
 *     responses:
 *       200:
 *         description: Serie de Fibonacci generada con éxito
 *         content:
 *           application/json:
 *             example:
 *               fibonacciSeries: [390, 241, 149, 92, 57, 35, 22, 13, 9, 4]
 *       400:
 *         description: Formato de hora inválido
 *         content:
 *           application/json:
 *             example:
 *               error: "Formato de hora inválido. Debe ser HH:mm:ss."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor."
 */
route.post("/clock", createFibbonaci);

module.exports = route;
